# 🌍 Toural — Tourism & Hospitality Management Platform

Toural is a full-stack, microservices-based tourism and hospitality management platform built with **Spring Boot**,
**React 19**, and **Python FastAPI**. It enables users to discover destinations across India, browse hotels, book trip packages 
(hotel + guide + car), make real payments via Razorpay, and receive ML-powered personalized recommendations — all through a clean,
responsive frontend backed by a distributed backend with carefully designed database strategies.

---

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Services](#services)
- [Tech Stack](#tech-stack)
- [Database Strategy](#database-strategy)
- [Security & Authentication Flow](#security--authentication-flow)
- [Rating System Architecture](#rating-system-architecture)
- [Booking & Payment Flow](#booking--payment-flow)
- [Recommendation Engine](#recommendation-engine)
- [Inter-Service Communication](#inter-service-communication)
- [Project Structure](#project-structure)
- [Service Port Reference](#service-port-reference)
- [Getting Started](#getting-started)
- [API Gateway Routes](#api-gateway-routes)
- [Frontend Architecture](#frontend-architecture)
- [Data Seeding & Utilities](#data-seeding--utilities)

---

## Architecture Overview

Toural follows a **microservices architecture** with a centralized Spring Cloud Gateway, service discovery via Netflix Eureka, stateless JWT authentication enforced at the gateway, and a Python ML recommendation engine registered alongside Java services in Eureka.

```
                          ┌─────────────────────┐
                          │   React 19 Frontend  │  :5173
                          │  (Vite + Tailwind 4) │
                          └──────────┬───────────┘
                                     │ Bearer JWT (axios interceptor)
                          ┌──────────▼───────────┐
                          │     API Gateway       │  :8084
                          │  (Spring Cloud WebFlux│
                          │  + Auth Filter + CORS)│
                          └──────────┬────────────┘
                                     │ Routes via Eureka load balancer
         ┌──────────┬────────────────┼──────────────┬───────────────┐
         │          │                │               │               │
  ┌──────▼──┐ ┌─────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
  │  Auth   │ │   User     │ │   Hotel     │ │  Booking   │ │  Rating    │
  │ Server  │ │  Service   │ │  Service    │ │  Service   │ │  Service   │
  │  :9000  │ │  :8080     │ │  :9090      │ │   :8096    │ │   :8082    │
  │(Postgres│ │(Postgres   │ │ (MongoDB)   │ │(Postgres + │ │(Postgres + │
  │ + JWT)  │ │ + Flyway)  │ │             │ │ Razorpay)  │ │ Flyway)    │
  └─────────┘ └────────────┘ └──────┬──────┘ └────────────┘ └────────────┘
                                    │ WebClient
                          ┌─────────▼────────────┐
                          │  Recommendation       │  :8000
                          │  System (FastAPI)     │
                          │  TF-IDF + cosine sim  │
                          └──────────────────────┘
                                     │ all services register
                          ┌──────────▼───────────┐
                          │   Service Registry    │  :8761
                          │   (Netflix Eureka)    │
                          └──────────────────────┘
```

---

## Services

| Service | Framework | Database | Port |
|---|---|---|---|
| **API Gateway** | Spring Boot + Spring Cloud Gateway (WebFlux) | — | 8084 |
| **Service Registry** | Spring Boot + Netflix Eureka | — | 8761 |
| **Authentication Server** | Spring Boot + Spring Security + JJWT | PostgreSQL | 9000 |
| **User Service** | Spring Boot + JPA + Flyway | PostgreSQL | 8080 |
| **Hotel Service** | Spring Boot + Spring Data MongoDB + WebFlux WebClient | MongoDB | 9090 |
| **Booking Service** | Spring Boot + JPA + Razorpay SDK | PostgreSQL | 8096 |
| **Rating Service** | Spring Boot + JPA + Flyway | PostgreSQL | 8082 |
| **Recommendation System** | Python + FastAPI + scikit-learn | CSV (TF-IDF model) | 8000 |
| **Frontend** | React 19 + Vite 7 + Tailwind CSS 4 | — | 5173 |

---

## Tech Stack

### Backend (Java)
- **Java 21 / 25** with Spring Boot 3.x
- **Spring Cloud Gateway (WebFlux)** — reactive, non-blocking API gateway
- **Netflix Eureka** — service discovery and client-side load balancing (`lb://SERVICE_NAME`)
- **Spring Security** — stateless JWT filter chain (BCrypt password encoding)
- **JJWT (HS512)** — token signing, subject extraction, expiry validation
- **Spring Data JPA + Hibernate** — ORM for PostgreSQL services
- **Spring Data MongoDB** — document mapping with `@Document`, `@Indexed` annotations
- **Flyway** — versioned SQL migration management (UserService, RatingService)
- **OpenFeign + Spring Cloud LoadBalancer** — declarative inter-service HTTP (Auth → User)
- **WebClient (Reactive)** — non-blocking HTTP client (Hotel → Recommendation service)
- **Razorpay Java SDK** — payment order creation and verification
- **Spring Scheduling** — `@Scheduled` cron jobs for nightly rating sync
- **Lombok** — boilerplate reduction across all services

### Databases
- **PostgreSQL** — AuthServer, UserService, BookingService, RatingService
- **MongoDB** — HotelService (`hotels`, `cities`, `states`, `places`, `guides`, `cars` collections)

### Recommendation Engine (Python)
- **FastAPI** — REST endpoints for hotel and place recommendations
- **scikit-learn** — TF-IDF vectorizer + cosine similarity matrix
- **pandas / numpy** — dataset loading and feature engineering
- **py-eureka-client** — registers FastAPI service with Eureka on startup/shutdown

### Frontend
- **React 19** — functional components, hooks, Context API
- **Vite 7** — fast HMR build tooling
- **Tailwind CSS 4** — utility-first styling with dark/light theme
- **React Router DOM 7** — client-side routing with protected routes
- **Axios** — HTTP client with JWT request interceptor
- **react-razorpay** — Razorpay checkout integration

---

## Database Strategy

This is the most deliberate aspect of Toural's design. Each service's database was chosen and structured to match its specific access patterns and scale characteristics.

---

### UserService — PostgreSQL with List Partitioning (16 Buckets)

The `base_user_core` table is a **PostgreSQL partitioned table** using `PARTITION BY LIST (email_bucket)`, with 16 physical child partitions (`base_user_core_p0` through `base_user_core_p15`).

**Why partitioned?** Users are a global, ever-growing entity. Partitioning ensures that as user volume grows, each query hits only one partition rather than a full table scan. No cross-partition joins are needed for normal user operations since all lookups go by `email_bucket + user_id`.

**Bucketing algorithm:** The `email_bucket` column is computed deterministically at write time by the `EmailBucket` utility:

```java
// EmailBucket.java
MessageDigest md = MessageDigest.getInstance("MD5");
byte[] digest = md.digest(normalizedEmail.getBytes(StandardCharsets.UTF_8));
byte[] first8 = new byte[8];
System.arraycopy(digest, 0, first8, 0, 8);
BigInteger bi = new BigInteger(1, first8);
return bi.mod(BigInteger.valueOf(16)).intValue(); // bucket 0–15
```

This gives uniform distribution across 16 partitions based on the email's MD5 hash. Email normalization (trim + lowercase) ensures the same email always routes to the same bucket.

**Composite primary key:** `(email_bucket, user_id)` — the partition key must be part of the PK in PostgreSQL list-partitioned tables. A global sequence (`user_seq`, cached 100) generates `user_id` values efficiently.

**Schema evolution managed by Flyway:**

| Migration | Purpose |
|---|---|
| `V1` | Creates `base_user_core` with 16 partitions + global email uniqueness constraint |
| `V2` | Creates `user_profile` table (DOB, address, profile picture) — FK to `base_user_core` |
| `V3` | Creates `driver` table (license, vehicle info, ratings) — FK to `base_user_core` |
| `V4` | Creates `hotel_manager` table (managed hotel ID, office details) |
| `V5` | Creates `tourist_guide` table (bio, languages JSONB, certifications text[], hourly rate, availability JSONB) |
| `V6` | Alters `hotel_manager.managed_hotel_id` from INT to VARCHAR(255) + drops NOT NULL |

**JSONB usage:** `tourist_guide.languages` and `tourist_guide.availability` are stored as JSONB for flexible, schema-less data (e.g., `[{"code": "en", "level": "native"}]` or `{"mon": "9am-6pm", "fri": "9am-3pm"}`).

**`@PrePersist` hook** in `BaseUser` automatically computes `normEmail` and `emailBucket` before every insert/update, keeping the bucketing logic centralized in Java rather than scattered across callers.

---

### RatingService — PostgreSQL with Partitioning + Trigger-Based Aggregation (Flyway-managed)

The `user_target_reviews` table uses `PARTITION BY LIST (target_type)` with three partitions: `user_target_reviews_hotel`, `user_target_reviews_guide`, and `user_target_reviews_driver`.

**Primary key:** `(user_id, target_type, target_id)` — composite key that enforces one review per user per target entity.

**Partial index on hotel partition:**
```sql
CREATE INDEX IF NOT EXISTS idx_utr_hotel_rating_with_comments
  ON user_target_reviews_hotel (target_id, rating, created_at DESC)
  WHERE comment IS NOT NULL;
```
This index accelerates fetching rated reviews with text comments for a given hotel, sorted by recency.

**Pre-aggregated rating tables:** Instead of doing `AVG(rating)` on every read request, three separate aggregation tables maintain running totals:

```sql
hotel_rating_agg  (hotel_id PK, rating NUMERIC(5,3), review_count BIGINT)
guide_rating_agg  (guide_id PK, rating NUMERIC(5,3), review_count BIGINT)
driver_rating_agg (driver_id PK, rating NUMERIC(5,3), review_count BIGINT)
```

The `rating` column stores the **sum** of all ratings (not the average). The actual average is computed at read time as `rating / review_count`. This avoids floating-point drift from incremental average updates.

**PostgreSQL Trigger (`V2`, `V3`):** A trigger function `user_target_reviews_agg_trigger()` fires `AFTER INSERT OR UPDATE OR DELETE` on each partition to maintain the aggregation tables in real time:

```sql
-- On INSERT:  agg.rating += new.rating,  agg.review_count += 1
-- On DELETE:  agg.rating -= old.rating,  agg.review_count -= 1
-- On UPDATE:  agg.rating = agg.rating - old.rating + new.rating (only if rating changed)
```

The trigger is applied idempotently to all partitions via a `DO $$ ... FOR part IN SELECT pg_inherits ... LOOP` block, making it safe to rerun. **V4 drops the trigger function** (superseded by cron-based sync for cross-service propagation).

---

### HotelService — MongoDB (Document Store)

MongoDB is used here because hotel/place data is **hierarchical and highly varied** — hotels have room counts, image lists, policy arrays, and geographic info, while tours/places have culturally specific fields like `significance`, `dslr_allowed`, and `best_time_to_visit`. A document model fits this naturally without requiring schema migrations for each new field.

**Collections:**

| Collection | Key fields |
|---|---|
| `hotels` | `hotelId` (unique indexed), `cityCode` (indexed), room counts, price, rating, images[], policies[] |
| `cities` | `cityCode` (indexed), `cityName`, `stateName` |
| `states` | state-level geographic data |
| `places` | zone, state, city, type, significance, entrance fee, google_review_rating, features, uniq_id |
| `guides` | `guideId` (unique indexed), `cityCode` (indexed), languages[], specialization, rating, pricePerDay |
| `cars` | `carId` (unique indexed), `cityCode` (indexed), brand, model, type, seatingCapacity, fuelType, transmission |

`cityCode` is indexed on hotels, guides, and cars to support fast by-city filtering — the primary query pattern for the discovery pages.

**Cross-database inventory sync:** The `sync_hotel_inventory.py` script reads all hotels from MongoDB, computes total available room count (`singleRoom + doubleRoom + suite + familyRoom`, boosted to at least 15), then upserts an `Inventory` record in PostgreSQL's `booking_service` database for each hotel. This bridges the document store (source of truth for hotel metadata) with the relational store (source of truth for booking availability).

---

### BookingService — PostgreSQL (Relational + Inventory)

Booking and inventory data is strictly relational — it needs ACID transactions and referential guarantees for financial operations.

**Key entities:**

- **`Booking`** — `userId`, `itemType` (HOTEL / GUIDE / CAR / PACKAGE), `itemId`, `totalPrice`, `status` (PENDING / SUCCESS / FAILED), Razorpay order/payment IDs
- **`Inventory`** — `itemType`, `itemId`, `availableCount`, `price`, `isAvailable`
- **`PaymentLog`** — append-only audit trail of payment events

**`@Transactional` booking flow:** Inventory check, price calculation, booking creation, and Razorpay order creation all happen within a single database transaction. If Razorpay throws, the whole transaction rolls back — no orphaned bookings.

**Package booking support:** `itemId` encodes a composite payload like `HOTEL:h1,GUIDE:g1,CAR:c1`. The `BookingService` splits and validates each segment against inventory independently, sums prices, then creates one Razorpay order for the combined total.

---

### AuthServer — PostgreSQL (Dedicated auth credentials store)

Auth credentials are kept in a **separate database** (`AuthenticationServer`) isolated from UserService's profile data. This means a compromise of the auth DB does not expose user profile data, and the auth service can be scaled or replaced independently. Passwords are stored as **BCrypt** hashes. The `AuthUser` entity holds `username` and `password` only.

---

## Security & Authentication Flow

```
Frontend                API Gateway              Auth Server          UserService
   │                        │                        │                    │
   │── POST /auth/login ────▶│                        │                    │
   │                        │── forward (open route) ▶│                    │
   │                        │                        │── authenticate()    │
   │                        │                        │── BCrypt verify     │
   │                        │                        │── generateToken()   │
   │                        │◀─────── JWT ───────────│                    │
   │◀──────── JWT ──────────│                        │                    │
   │                        │                        │                    │
   │── POST /auth/signup ───▶│                        │                    │
   │                        │── forward (open route) ▶│                    │
   │                        │                        │── saveUser()        │
   │                        │                        │── OpenFeign ────────▶
   │                        │                        │                    │── save to DB
   │                        │                        │◀── 200 OK ──────────│
   │◀────── 200 OK ─────────│                        │                    │
   │                        │                        │                    │
   │── GET /hotels/** ──────▶│                        │                    │
   │  [Authorization: Bearer]│                        │                    │
   │                        │── RouteValidator.isSecure?                  │
   │                        │── JwtService.validateToken()                │
   │                        │── (valid) forward to lb://HOTEL-SERVICE     │
   │◀────── hotel data ─────│                        │                    │
```

**JWT details:**
- Algorithm: **HS512** with a shared secret (configurable via `jwt.secret.key`)
- Validity: **36 hours** (`JWT_TOKEN_VALIDITY = 36 * 60 * 60`)
- Claims: `role` (user type) + `sub` (userId/username) + `iat` + `exp`
- Short-lived **OTP token** variant: 150-second expiry for sensitive flows

**Gateway filter logic (`RouteValidator`):**
- **Open endpoints** (no auth required): `/auth/login`, `/auth/signup`
- **Internal endpoints** (blocked from external clients): `/user/add-user`
- **All other routes**: JWT must be present and valid in `Authorization: Bearer <token>` header

**Frontend token management:** JWT is stored in `localStorage`. The custom Axios instance attaches it on every request via a request interceptor. On login, the token is saved; on logout, it is removed. The `AuthContext` also handles Google OAuth callback by reading `?jwtToken=...` from the URL query string on redirect.

---

## Rating System Architecture

Toural implements a **dual-layer rating architecture** to balance write performance (real-time trigger updates) with cross-service availability (nightly cron sync).

### Layer 1: Real-time PostgreSQL Triggers (RatingService)

When a user submits a review, `user_target_reviews` is updated and a PostgreSQL trigger immediately updates the corresponding aggregation table (`hotel_rating_agg`, `guide_rating_agg`, `driver_rating_agg`). Reads of rating scores are O(1) lookups on the agg table — no aggregation at query time.

### Layer 2: Nightly Cron Sync (HotelService + UserService)

Since hotel ratings live in MongoDB (`hotels.rating`) and guide/driver ratings live in PostgreSQL (`tourist_guide.rating_avg`, `driver.rating_avg`), a daily sync job propagates the latest aggregated ratings from RatingService to the other services.

Both **HotelService** and **UserService** run an identical pattern:

```java
@Scheduled(cron = "0 0 0 * * ?")   // midnight every day
public void syncRatings() {
    // Call Rating Service via API Gateway:
    // GET http://localhost:8084/rating/aggregates/{type}
    // Returns Map<Long targetId, Map<"rating"|"count", Number>>

    // For each entry:
    //   hotelRepo.findByHotelId(id).ifPresent(h -> { h.setRating(avg); save; })
    //   touristGuideRepository.findByIdUserId(id).ifPresent(g -> { g.setRatingAvg(avg); save; })
    //   driverRepository.findByIdUserId(id).ifPresent(d -> { d.setRatingAvg(avg); save; })
}
```

This means rating data in each service is at most 24 hours stale — acceptable for display-side ratings while keeping services fully decoupled.

---

## Booking & Payment Flow

```
User                  Frontend              BookingService          Razorpay
 │                       │                       │                     │
 │── fill checkout ──────▶│                       │                     │
 │                       │── POST /api/booking ──▶│                     │
 │                       │                       │── check inventory    │
 │                       │                       │── calc price         │
 │                       │                       │── save PENDING booking
 │                       │                       │── POST Razorpay order▶
 │                       │                       │◀─ { orderId, amount }│
 │                       │◀── { bookingId, order }│                     │
 │                       │                       │                     │
 │                       │── open Razorpay SDK    │                     │
 │── pay ────────────────────────────────────────────────────────────────▶
 │◀── paymentId ──────────────────────────────────────────────────────────
 │                       │                       │                     │
 │                       │── POST /api/payment/verify                  │
 │                       │   { razorpayOrderId, razorpayPaymentId }    │
 │                       │                       │── update status → SUCCESS
 │                       │                       │── decrement inventory
 │                       │                       │── write PaymentLog
 │                       │◀── booking confirmed  │                     │
 │◀── /payment-status ───│                       │                     │
```

**Package bookings** (`ItemType.PACKAGE`) encode multiple items as a single `itemId` string (e.g., `HOTEL:h1,GUIDE:g1,CAR:c1`). The service parses, validates, and prices each sub-item, then creates one Razorpay order for the full package. On payment confirmation, inventory is decremented for each sub-item atomically within a `@Transactional` method.

---

## Recommendation Engine

The Python FastAPI service provides TF-IDF cosine similarity recommendations for both hotels and places.

**Hotel recommendations** use a dataset (`df_new.csv`) with features built from hotel amenities and properties. **Place recommendations** use a dataset (`df.csv`) with features built from `type + significance + best_time_to_visit`.

**Available endpoints:**

| Endpoint | Description |
|---|---|
| `GET /recommend?hotel_name=X&top_n=5` | Similar hotels globally |
| `GET /recommend/city?hotel_name=X` | Similar hotels in same city |
| `GET /recommend/district?hotel_name=X` | Similar hotels in same state |
| `GET /places/recommend?place_name=X` | Similar places globally |
| `GET /places/recommend/city?place_name=X` | Similar places in same city |
| `GET /places/recommend/state?place_name=X` | Similar places in same state |

**HotelService integration:** The `HotelRecommendationService` calls the FastAPI service using a reactive **WebClient** (`webClient.get().uri(...).retrieve().bodyToFlux(...).collectList().block()`). It then maps returned `uniq_id` / `hotelId` values back to full `Hotel` MongoDB documents and returns them to the frontend.

**Eureka registration:** On FastAPI startup, `py_eureka_client` registers the service with Eureka so Java services can discover it. On shutdown, it de-registers cleanly.

---

## Inter-Service Communication

| From | To | Method | Purpose |
|---|---|---|---|
| API Gateway | All services | Spring Cloud Gateway + Eureka (`lb://`) | Route all client requests |
| AuthServer | UserService | **OpenFeign** (`/user/add-user`) | Create user profile on signup |
| HotelService | RatingService (via Gateway) | **RestTemplate** (cron) | Fetch hotel rating aggregates for nightly sync |
| UserService | RatingService (via Gateway) | **RestTemplate** (cron) | Fetch guide/driver rating aggregates for nightly sync |
| HotelService | Recommendation System | **WebClient (reactive)** | Fetch similar hotels/places |
| Frontend | API Gateway | **Axios** (with JWT interceptor) | All API calls |

---

## Project Structure

```
Toural/
├── APIGateway/                    # Spring Cloud Gateway
│   └── src/main/java/
│       └── service/
│           ├── AuthenticationFilter.java   # Gateway filter: JWT validation
│           ├── JwtService.java             # Token parsing at gateway layer
│           └── RouteValidator.java         # Open/internal/secured route lists
│
├── AuthenticationServer/           # JWT auth: login, signup, token issuance
│   └── src/main/java/
│       ├── Config/
│       │   ├── SecurityConfig.java         # Stateless, BCrypt, filter chain
│       │   └── CustomUserDetailService.java
│       ├── Controller/
│       │   ├── AuthController.java         # /auth/login, /auth/signup
│       │   └── AdminController.java
│       ├── Service/
│       │   ├── JwtHelper.java              # HS512 token generation/validation
│       │   ├── AuthService.java
│       │   ├── JwtAuthenticationFilter.java
│       │   └── SendService.java
│       └── external_Services/
│           └── UserService.java            # OpenFeign client → UserService
│
├── UserService/                    # User profiles with partitioned PostgreSQL
│   └── src/main/
│       ├── java/
│       │   ├── Models/
│       │   │   ├── BaseUser.java           # Partitioned entity with @PrePersist email bucketing
│       │   │   ├── UserProfile.java
│       │   │   ├── Driver.java             # license, vehicle, rating_avg
│       │   │   ├── TouristGuide.java       # JSONB languages & availability
│       │   │   └── HotelManager.java
│       │   ├── Util/EmailBucket.java       # MD5 hash → bucket 0–15
│       │   └── cron/RatingSyncCronJob.java # Nightly guide/driver rating sync
│       └── resources/db/migration/
│           ├── V1__create_base_user_core.sql       # Partitioned table + 16 partitions
│           ├── V2__create_base_user_profile.sql
│           ├── V3__create_driver_profile.sql
│           ├── V4__create_hotel_manager.sql
│           ├── V5__create_tourist_guide_profile.sql
│           └── V6__alter_hotel_manager_id_to_varchar.sql
│
├── HotelService/                   # MongoDB: hotels, tours, cities, guides, cars
│   └── src/main/java/
│       ├── entities/
│       │   ├── Hotel.java          # @Document, @Indexed cityCode, images[], policies[]
│       │   ├── Tour.java           # places collection: significance, features, uniq_id
│       │   ├── City.java           # cityCode + cityName, both @Indexed
│       │   ├── State.java
│       │   ├── Guide.java          # languages[], specialization, pricePerDay
│       │   └── Car.java            # brand, model, type, fuelType, transmission
│       ├── services/
│       │   ├── HotelRecommendationService.java   # WebClient → FastAPI
│       │   ├── HotelService.java
│       │   └── TourService.java
│       ├── config/WebClientConfig.java           # WebClient bean pointing to Rec. system
│       └── cron/RatingSyncCronJob.java           # Nightly hotel rating sync from RatingService
│
├── BookingService/                 # Bookings, inventory, Razorpay payments
│   └── src/main/java/
│       ├── entities/
│       │   ├── Booking.java        # userId, itemType, itemId, status, razorpayOrderId
│       │   ├── Inventory.java      # itemType, itemId, availableCount, price
│       │   ├── PaymentLog.java     # audit trail: bookingId, paymentId, status, timestamp
│       │   ├── BookingStatus.java  # PENDING / SUCCESS / FAILED
│       │   └── ItemType.java       # HOTEL / GUIDE / CAR / PACKAGE
│       └── services/
│           ├── BookingService.java     # @Transactional: inventory check → booking → Razorpay order
│           └── PaymentService.java     # Razorpay order creation (INR, amount in paise)
│
├── RatingService/                  # Reviews and aggregations
│   └── src/main/
│       ├── java/
│       │   ├── Models/
│       │   │   ├── UserTargetReview.java   # composite PK: (user_id, target_type, target_id)
│       │   │   ├── HotelRatingAgg.java     # pre-aggregated: sum of ratings + count
│       │   │   ├── GuideRatingAgg.java
│       │   │   └── DriverRatingAgg.java
│       │   └── services/UserTargetReviewService.java
│       └── resources/db/migration/
│           ├── V1__create_rating_schema.sql       # Partitioned reviews + agg tables + partial index
│           ├── V2__create_trigger_func.sql        # PL/pgSQL trigger function (INSERT/UPDATE/DELETE)
│           ├── V3__apply_trigger.sql              # Idempotent trigger application to all partitions
│           └── V4__drop_rating_triggers.sql       # Drops trigger (replaced by cron-based sync)
│
├── ServiceRegistry/                # Netflix Eureka server (:8761)
│
├── Recommendation_system/          # Python FastAPI ML service
│   ├── app.py                      # TF-IDF model + 6 recommendation endpoints + Eureka registration
│   ├── df.csv                      # Places dataset (type, significance, best_time_to_visit)
│   └── df_new.csv                  # Hotels dataset (property_name, city, state, features)
│
├── toural/                         # React 19 + Vite frontend
│   └── src/
│       ├── pages/                  # Route-level components
│       ├── components/             # Feature-grouped UI
│       │   ├── auth/               # LoginForm, SignupForm, AuthLayout
│       │   ├── checkout/           # TravellerDetailsForm, PaymentSummarySidebar, PriceBreakdownCard
│       │   ├── home/               # HeroSection, FeaturedTripsSection, TripPlannerCard
│       │   ├── hotels/             # HotelsListPage, HotelDetails, NearByHotels
│       │   ├── tripDetails/        # DaywisePlan, ReviewsList, TripSummaryCard, ActionBar
│       │   ├── payment/            # PaymentSuccessView, PaymentFailureView
│       │   ├── results/            # DestinationCard, HighlightsList, StayOptionItem
│       │   ├── user/               # UserProfilePage, MyTripsList, TripBookingCard
│       │   ├── layout/             # Navbar (split components), Footer, AmbientBackground, PageShell
│       │   └── ui/                 # Button, Card, TextInput, RatingStars, SelectableChip, ThemeToggle...
│       ├── context/
│       │   ├── AuthContext.jsx     # JWT storage, login/logout/signup, Google OAuth redirect
│       │   ├── TourContext.jsx     # Trip/tour state
│       │   ├── UserContext.jsx     # User profile state
│       │   └── axiosInstance.js   # Axios base URL + JWT interceptor
│       ├── router/
│       │   ├── Router.jsx          # All routes, MainLayout wrapper
│       │   └── ProtectedRoute.jsx  # Redirect to login if no JWT
│       └── theme/ThemeContext.jsx  # Dark/light mode context
│
├── seed_guides_cars.py             # Populates MongoDB with realistic Indian guide/car data
└── sync_hotel_inventory.py        # Syncs hotel room counts from MongoDB → PostgreSQL inventory
```

---

## Service Port Reference

| Service | Port |
|---|---|
| React Frontend | 5173 |
| API Gateway | 8084 |
| Eureka Service Registry | 8761 |
| Auth Server | 9000 |
| User Service | 8080 |
| Hotel Service | 9090 |
| Booking Service | 8096 |
| Rating Service | 8082 |
| Recommendation System (FastAPI) | 8000 |

---

## Getting Started

### Prerequisites

- Java 21+
- Node.js 18+
- Python 3.10+
- PostgreSQL 14+
- MongoDB 6+
- Maven 3.8+

### 1. Database Setup

Create the required PostgreSQL databases:

```sql
CREATE DATABASE "AuthenticationServer";
CREATE DATABASE "booking_service";
CREATE DATABASE "RatingService";
-- UserService DB is auto-migrated by Flyway; just ensure the DB exists:
CREATE DATABASE "UserService";
```

MongoDB database and collections are auto-created by Spring Data MongoDB on first write.

> **Security note:** Update all credentials in `application.yaml` / `application.properties` files before running. For production, use Spring profiles (e.g., `application-prod.yaml`) or environment variables. Never commit credentials to version control.

### 2. Start the Service Registry

```bash
cd ServiceRegistry/ServiceRegistry
./mvnw spring-boot:run
```

Eureka dashboard available at `http://localhost:8761`

### 3. Start Backend Services

Start in the following order (Eureka must be running first):

```bash
# Auth Server
cd AuthenticationServer/AuthServer && ./mvnw spring-boot:run

# User Service (Flyway migrations run automatically)
cd UserService && ./mvnw spring-boot:run

# Hotel Service
cd HotelService/HotelService && ./mvnw spring-boot:run

# Rating Service (Flyway migrations run automatically)
cd RatingService/RatingService && ./mvnw spring-boot:run

# Booking Service
cd BookingService/BookingService && ./mvnw spring-boot:run

# API Gateway (start last)
cd APIGateway/APIGateway && ./mvnw spring-boot:run
```

### 4. Start the Recommendation System

```bash
cd Recommendation_system
pip install fastapi uvicorn pandas numpy scikit-learn py-eureka-client
uvicorn app:app --reload --port 8000
```

### 5. Seed the Database

```bash
# Seed MongoDB with guides and cars
pip install pymongo psycopg2-binary
python seed_guides_cars.py

# Sync hotel inventory from MongoDB to PostgreSQL
python sync_hotel_inventory.py
```

### 6. Start the Frontend

```bash
cd toural
npm install
npm run dev
```

Frontend available at `http://localhost:5173`

---

## API Gateway Routes

All client requests go through the API Gateway on port `8084`. CORS is configured for `http://localhost:5173`.

| Path Pattern | Routed To | Auth Required |
|---|---|---|
| `/auth/login`, `/auth/signup` | Auth Server (:9000) | No |
| `/user/**` | User Service (:8080) | Yes |
| `/hotels/**`, `/city/**`, `/state/**` | Hotel Service (:9090) | Yes |
| `/tours/**`, `/guides/**`, `/cars/**` | Hotel Service (:9090) | Yes |
| `/api/recommend` | Hotel Service (:9090) → Rec. System | Yes |
| `/rating/**` | Rating Service (:8082) | Yes |
| `/api/booking/**`, `/api/payment/**`, `/api/inventory/**` | Booking Service (:8096) | Yes |

Internal endpoint `/user/add-user` is explicitly blocked from external access by `RouteValidator.isInternal`.

---

## Frontend Architecture

### State Management

State is managed through React Context API with three domain contexts:

- **`AuthContext`** — JWT token lifecycle (localStorage), login/logout/signup actions, Google OAuth callback handling, `useAuth()` hook
- **`TourContext`** — Selected trip/tour data passed between results and details pages
- **`UserContext`** — Logged-in user profile data

### HTTP Layer

A custom `axiosInstance` sets `http://localhost:8084` as the base URL and attaches `Authorization: Bearer <token>` on every outgoing request via a request interceptor — so no individual component needs to manage headers.

### Routing

All routes are wrapped in a `MainLayout` (Navbar + AmbientBackground + PageShell + Footer). Protected routes (`/my-trips`, `/checkout`, `/payment-status`) are wrapped in `ProtectedRoute` which redirects unauthenticated users to `/login`.

### Frontend Pages

| Page | Path | Auth | Description |
|---|---|---|---|
| Home | `/` | No | Hero, featured trips, info strip, places |
| All Destinations | `/destination` | No | Browse all places |
| Login | `/login` | No | JWT login form |
| Signup | `/signup` | No | User registration with role selection |
| Results | `/results` | No | Destination search results with stay options |
| Trip Details | `/trip/:id` | No | Day-wise plan, highlights, reviews, stay options |
| Hotels List | `/hotels` | No | Browse hotels by destination |
| Hotel Details | `/hotel` or `/hotels/:hotelId` | No | Hotel info, room options, nearby hotels |
| Packages | `/packages` | No | Tour packages listing |
| Guides | `/guides` | No | Local guide listings |
| Cars | `/cars` | No | Car rental listings |
| Checkout | `/checkout` | **Yes** | Traveller details, payment method, price summary |
| Payment Status | `/payment-status` | **Yes** | Success / failure feedback |
| My Trips | `/my-trips` | **Yes** | User booking history |
| Profile | `/profile` | No | User profile management |

---

## Data Seeding & Utilities

**`seed_guides_cars.py`** — Generates realistic synthetic Indian guide and car data and inserts it into MongoDB. Uses pools of real Indian first/last names, regional languages, and specialization categories (Heritage & Culture, Adventure & Trekking, Wildlife & Nature, Religious & Pilgrimage, etc.). Also inserts corresponding `Inventory` records into PostgreSQL's `booking_service` database so guides and cars can be booked immediately.

**`sync_hotel_inventory.py`** — Reads every hotel document from MongoDB, calculates total room count, and upserts into the `inventory_table` in PostgreSQL. This must be run after hotels are loaded into MongoDB to make them bookable. It also updates `availableCount` on MongoDB side to keep both stores consistent.
