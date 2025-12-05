package com.Toural.UserService.Models;


import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tourist_guide")
public class TouristGuide {
    @EmbeddedId
    private UserProfileId id;

    @Column(name = "bio", columnDefinition = "text",nullable = false)
    private String bio;

    @Column(name = "languages", columnDefinition = "jsonb")
    private String languagesJson;

    @Column(name = "certifications", columnDefinition = "text[]")
    private String[] certifications;

    @Column(name = "hourly_rate", precision = 10, scale = 2,nullable = false)
    private BigDecimal hourlyRate;

    @Column(name = "rating_avg", precision = 3, scale = 2)
    private BigDecimal ratingAvg;

    @Column(name = "rating_count")
    private Integer ratingCount;

    @Column(name = "location", columnDefinition = "text",nullable = false)
    private String location;

    @Column(name = "availability", columnDefinition = "jsonb",nullable = false)
    private String availabilityJson;

    @Column(name = "created_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) this.createdAt = OffsetDateTime.now();
        if (this.updatedAt == null) this.updatedAt = this.createdAt;
        if (this.ratingAvg == null) this.ratingAvg = BigDecimal.valueOf(0.0);
        if (this.ratingCount == null) this.ratingCount = 0;
    }

    @PreUpdate
    public void preUpdate() {
        if (this.updatedAt == null) this.updatedAt = OffsetDateTime.now();
    }


}
