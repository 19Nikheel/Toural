import random
import string
from pymongo import MongoClient
import psycopg2

# ============================================================
# REALISTIC INDIAN DATA POOLS
# ============================================================

FIRST_NAMES = [
    "Rajesh", "Amit", "Sunil", "Vikram", "Arun", "Deepak", "Sanjay", "Manoj",
    "Ravi", "Ashok", "Priya", "Anita", "Sunita", "Kavita", "Meena", "Rekha",
    "Ramesh", "Suresh", "Mahesh", "Ganesh", "Dinesh", "Naresh", "Rakesh", "Mukesh",
    "Pooja", "Neha", "Shreya", "Anjali", "Divya", "Swati", "Nisha", "Ritu",
    "Arjun", "Karan", "Rohit", "Nikhil", "Varun", "Sahil", "Mohit", "Gaurav",
    "Lakshmi", "Sarita", "Geeta", "Seema", "Manisha", "Shobha", "Usha", "Jyoti",
    "Bharat", "Chandan", "Devendra", "Harish", "Jagdish", "Kishore", "Mohan", "Pramod",
    "Suman", "Tara", "Uma", "Vandana", "Yamini", "Zara", "Aarti", "Babita",
]

LAST_NAMES = [
    "Kumar", "Sharma", "Singh", "Verma", "Gupta", "Patel", "Joshi", "Mishra",
    "Yadav", "Chauhan", "Tiwari", "Pandey", "Dubey", "Srivastava", "Agarwal",
    "Reddy", "Nair", "Menon", "Pillai", "Iyer", "Rao", "Naidu", "Patil", "Deshmukh",
    "Das", "Bose", "Sen", "Mukherjee", "Chatterjee", "Banerjee", "Ghosh", "Roy",
    "Thakur", "Rathore", "Rajput", "Mehra", "Kapoor", "Malhotra", "Khanna", "Bhatia",
    "Hegde", "Kamath", "Shetty", "Gowda", "Kulkarni", "Deshpande", "Jain", "Mehta",
]

LANGUAGES_POOL = [
    "Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali",
    "Marathi", "Gujarati", "Punjabi", "Odia", "Assamese", "Urdu", "Rajasthani",
    "Konkani", "Manipuri", "Kashmiri", "Sanskrit", "French", "German", "Japanese",
]

SPECIALIZATIONS = [
    "Heritage & Culture", "Adventure & Trekking", "Wildlife & Nature",
    "Religious & Pilgrimage", "Food & Culinary", "Photography Tours",
    "Hill Station Explorer", "Beach & Coastal", "Historical Monuments",
    "City Walking Tours", "Eco Tourism", "Rural & Village Tours",
    "Art & Architecture", "Festival & Events", "Backpacking Guide",
]

GUIDE_BIOS = [
    "Passionate about sharing the rich history and culture of the region with travelers from around the world.",
    "Experienced trekker and adventure enthusiast who loves exploring off-the-beaten-path destinations.",
    "Certified wildlife guide with deep knowledge of local flora and fauna.",
    "Multilingual guide specializing in religious and spiritual tours across sacred sites.",
    "A foodie at heart who takes visitors on authentic culinary journeys through local markets and eateries.",
    "Professional photographer and guide who helps tourists capture the perfect moments.",
    "Born and raised locally, offering insider knowledge and authentic cultural experiences.",
    "Former history professor turned full-time guide, bringing stories of the past alive.",
    "Eco-tourism advocate promoting sustainable and responsible travel practices.",
    "Energetic and friendly guide known for creating memorable experiences for families and groups.",
    "Expert in local handicrafts and traditional arts, connecting visitors with artisan communities.",
    "Adventure sports certified guide offering paragliding, rafting, and camping experiences.",
]

# ---- CAR DATA ----

CAR_BRANDS_MODELS = {
    "Maruti Suzuki": [
        ("Swift", "Hatchback", 5, ["Petrol", "CNG"]),
        ("Swift Dzire", "Sedan", 5, ["Petrol", "Diesel", "CNG"]),
        ("Ertiga", "SUV", 7, ["Petrol", "Diesel", "CNG"]),
        ("Baleno", "Hatchback", 5, ["Petrol"]),
        ("Brezza", "SUV", 5, ["Petrol", "CNG"]),
        ("Ciaz", "Sedan", 5, ["Petrol"]),
        ("XL6", "SUV", 6, ["Petrol", "CNG"]),
        ("Wagon R", "Hatchback", 5, ["Petrol", "CNG"]),
    ],
    "Hyundai": [
        ("Creta", "SUV", 5, ["Petrol", "Diesel"]),
        ("Venue", "SUV", 5, ["Petrol", "Diesel"]),
        ("i20", "Hatchback", 5, ["Petrol", "Diesel"]),
        ("Verna", "Sedan", 5, ["Petrol", "Diesel"]),
        ("Tucson", "SUV", 5, ["Petrol", "Diesel"]),
        ("Aura", "Sedan", 5, ["Petrol", "CNG"]),
    ],
    "Tata": [
        ("Nexon", "SUV", 5, ["Petrol", "Diesel", "Electric"]),
        ("Harrier", "SUV", 5, ["Diesel"]),
        ("Safari", "SUV", 7, ["Diesel"]),
        ("Punch", "SUV", 5, ["Petrol"]),
        ("Altroz", "Hatchback", 5, ["Petrol", "Diesel"]),
        ("Tigor EV", "Sedan", 5, ["Electric"]),
        ("Tiago", "Hatchback", 5, ["Petrol", "CNG"]),
    ],
    "Mahindra": [
        ("Thar", "SUV", 4, ["Petrol", "Diesel"]),
        ("XUV700", "SUV", 7, ["Petrol", "Diesel"]),
        ("Scorpio-N", "SUV", 7, ["Petrol", "Diesel"]),
        ("XUV300", "SUV", 5, ["Petrol", "Diesel"]),
        ("Bolero", "SUV", 7, ["Diesel"]),
    ],
    "Toyota": [
        ("Innova Crysta", "SUV", 7, ["Petrol", "Diesel"]),
        ("Fortuner", "SUV", 7, ["Petrol", "Diesel"]),
        ("Glanza", "Hatchback", 5, ["Petrol"]),
        ("Urban Cruiser Hyryder", "SUV", 5, ["Petrol"]),
    ],
    "Kia": [
        ("Seltos", "SUV", 5, ["Petrol", "Diesel"]),
        ("Sonet", "SUV", 5, ["Petrol", "Diesel"]),
        ("Carens", "SUV", 7, ["Petrol", "Diesel"]),
    ],
    "Honda": [
        ("City", "Sedan", 5, ["Petrol"]),
        ("Amaze", "Sedan", 5, ["Petrol", "Diesel"]),
        ("Elevate", "SUV", 5, ["Petrol"]),
    ],
    "MG": [
        ("Hector", "SUV", 5, ["Petrol", "Diesel"]),
        ("ZS EV", "SUV", 5, ["Electric"]),
        ("Astor", "SUV", 5, ["Petrol"]),
    ],
    "Mercedes-Benz": [
        ("E-Class", "Luxury", 5, ["Petrol", "Diesel"]),
        ("GLC", "Luxury", 5, ["Petrol", "Diesel"]),
        ("S-Class", "Luxury", 5, ["Petrol"]),
    ],
    "BMW": [
        ("3 Series", "Luxury", 5, ["Petrol", "Diesel"]),
        ("X1", "Luxury", 5, ["Petrol", "Diesel"]),
        ("5 Series", "Luxury", 5, ["Petrol", "Diesel"]),
    ],
}

TRANSMISSIONS = ["Manual", "Automatic"]

# Price ranges by car type
PRICE_RANGES = {
    "Hatchback": (800, 1800),
    "Sedan": (1200, 2800),
    "SUV": (1500, 4500),
    "Luxury": (4000, 12000),
}


def generate_phone():
    return f"9{random.randint(100000000, 999999999)}"


def generate_guides(cities, count=500):
    guides = []
    for i in range(count):
        city = random.choice(cities)
        first = random.choice(FIRST_NAMES)
        last = random.choice(LAST_NAMES)

        # Pick 2-4 languages, always include Hindi and English for most
        langs = ["Hindi", "English"]
        extra = random.sample(
            [l for l in LANGUAGES_POOL if l not in langs],
            k=random.randint(0, 2)
        )
        langs.extend(extra)

        guide = {
            "guideId": f"guide-{i+1:04d}",
            "name": f"{first} {last}",
            "cityName": city["cityName"],
            "cityCode": city["cityCode"],
            "stateName": city["stateName"],
            "languages": langs,
            "specialization": random.choice(SPECIALIZATIONS),
            "experience": random.randint(1, 25),
            "rating": round(random.uniform(3.0, 5.0), 1),
            "pricePerDay": random.randint(12, 45) * 100.0,  # 1200 - 4500
            "phone": generate_phone(),
            "bio": random.choice(GUIDE_BIOS),
            "isAvailable": random.random() > 0.1,  # 90% available
        }
        guides.append(guide)
    return guides


def generate_cars(cities, count=400):
    cars = []
    for i in range(count):
        city = random.choice(cities)
        brand = random.choice(list(CAR_BRANDS_MODELS.keys()))
        model_info = random.choice(CAR_BRANDS_MODELS[brand])
        model_name, car_type, seats, fuel_options = model_info

        price_min, price_max = PRICE_RANGES.get(car_type, (1000, 3000))

        car = {
            "carId": f"car-{i+1:04d}",
            "brand": brand,
            "model": model_name,
            "type": car_type,
            "cityName": city["cityName"],
            "cityCode": city["cityCode"],
            "stateName": city["stateName"],
            "seatingCapacity": seats,
            "fuelType": random.choice(fuel_options),
            "transmission": random.choice(TRANSMISSIONS),
            "pricePerDay": float(random.randint(price_min // 100, price_max // 100) * 100),
            "rating": round(random.uniform(3.2, 5.0), 1),
            "isAvailable": random.random() > 0.08,  # 92% available
        }
        cars.append(car)
    return cars


def seed():
    # ---- MongoDB ----
    mongo = MongoClient("mongodb://localhost:27017/")
    db = mongo["Toural"]

    # Fetch all cities for consistent city references
    cities = list(db["cities"].find({}, {"_id": 0, "cityName": 1, "cityCode": 1, "stateName": 1}))
    print(f"Found {len(cities)} cities in MongoDB")

    # Drop old data if re-running
    db["guides"].drop()
    db["cars"].drop()

    # Generate data
    guides = generate_guides(cities, count=500)
    cars = generate_cars(cities, count=400)

    # Insert
    db["guides"].insert_many(guides)
    db["cars"].insert_many(cars)
    print(f"Inserted {len(guides)} guides into MongoDB")
    print(f"Inserted {len(cars)} cars into MongoDB")

    # Create indexes
    db["guides"].create_index("guideId", unique=True)
    db["guides"].create_index("cityCode")
    db["cars"].create_index("carId", unique=True)
    db["cars"].create_index("cityCode")

    # ---- PostgreSQL Inventory ----
    pg = psycopg2.connect(
        dbname="booking_service",
        user="postgres",
        password="Nik@9905366469",
        host="localhost",
        port="5432",
    )
    cur = pg.cursor()

    guide_count = 0
    for g in guides:
        available = 1 if g["isAvailable"] else 0
        cur.execute(
            """
            INSERT INTO inventory_table (item_type, item_id, available_count, is_available, price)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
            """,
            ("GUIDE", g["guideId"], available, g["isAvailable"], g["pricePerDay"]),
        )
        guide_count += 1

    car_count = 0
    for c in cars:
        available = 1 if c["isAvailable"] else 0
        cur.execute(
            """
            INSERT INTO inventory_table (item_type, item_id, available_count, is_available, price)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
            """,
            ("CAR", c["carId"], available, c["isAvailable"], c["pricePerDay"]),
        )
        car_count += 1

    pg.commit()
    cur.close()
    pg.close()
    mongo.close()

    print(f"Inserted {guide_count} GUIDE items into PostgreSQL inventory")
    print(f"Inserted {car_count} CAR items into PostgreSQL inventory")
    print("Done!")


if __name__ == "__main__":
    seed()
