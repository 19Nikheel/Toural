package com.Toural.rating.RatingService.Models;


import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "driver_rating_agg")
public class DriverRatingAgg {

    @Id
    @Column(name = "driver_id")
    private Long driverId;

    @Column(name = "rating", precision = 12, scale = 3, nullable = false)
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "review_count", nullable = false)
    private Long reviewCount = 0L;


    public DriverRatingAgg() {}

    public Long getDriverId() { return driverId; }
    public void setDriverId(Long driverId) { this.driverId = driverId; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public Long getReviewCount() { return reviewCount; }
    public void setReviewCount(Long reviewCount) { this.reviewCount = reviewCount; }
}