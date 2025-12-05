package com.Toural.rating.RatingService.Models;


import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "hotel_rating_agg")
public class HotelRatingAgg {

    @Id
    @Column(name = "hotel_id")
    private Long hotelId;

    // rating numeric(5,3) mapped to BigDecimal
    @Column(name = "rating", precision = 12, scale = 3, nullable = false)
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "review_count", nullable = false)
    private Long reviewCount = 0L;



    public HotelRatingAgg() {}

    public HotelRatingAgg(Long hotelId, BigDecimal rating, Long reviewCount) {
        this.hotelId = hotelId;
        this.rating = rating;
        this.reviewCount = reviewCount;
    }

    // getters & setters

    public Long getHotelId() { return hotelId; }
    public void setHotelId(Long hotelId) { this.hotelId = hotelId; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public Long getReviewCount() { return reviewCount; }
    public void setReviewCount(Long reviewCount) { this.reviewCount = reviewCount; }



}