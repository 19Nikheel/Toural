package com.Toural.UserService.Models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "driver")
public class Driver {

    @EmbeddedId
    private UserProfileId id;

    @Column(name = "license_number", nullable = false)
    private String licenseNumber;

    @Column(name = "vehicle_type",nullable = false)
    private String vehicleType;

    @Column(name = "vehicle_model",nullable = false)
    private String vehicleModel;

    @Column(name = "vehicle_number",nullable = false)
    private String vehicleNumber;

    @Column(name = "experience_years",nullable = false)
    private Integer experienceYears;

    @Column(name = "rating_avg", precision = 3, scale = 2)
    private BigDecimal ratingAvg;

    @Column(name = "rating_count")
    private Integer ratingCount;

    @Column(name = "created_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
        if (updatedAt == null) updatedAt = createdAt;
        if (ratingAvg == null) ratingAvg = new BigDecimal("1.00");
        if (ratingCount == null) ratingCount = 0;
    }

    @PreUpdate
    public void preUpdate() {
        if (updatedAt == null) updatedAt = OffsetDateTime.now();
    }


}
