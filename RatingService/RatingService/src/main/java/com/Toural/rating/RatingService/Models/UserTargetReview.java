package com.Toural.rating.RatingService.Models;

import java.time.OffsetDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

@Entity
@Table(name = "user_target_reviews")
public class UserTargetReview {

    @EmbeddedId
    private UserTargetReviewId id;

    // rating smallint CHECK (1..5) -> map to Integer or Short. Use Integer for convenience.
    @Column(name = "rating", nullable = false)
    private short rating;

    @Column(name = "comment")
    private String comment;

    @Column(name = "created_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "timestamptz")
    private OffsetDateTime updatedAt;

    public UserTargetReview() {}

    public UserTargetReview(UserTargetReviewId id, short rating, String comment) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
    }

    // getters & setters

    public UserTargetReviewId getId() { return id; }
    public void setId(UserTargetReviewId id) { this.id = id; }

    public short getRating() { return rating; }
    public void setRating(short rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }

    // optional lifecycle hooks — DB default will set created_at if you prefer DB-side default
    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) this.createdAt = OffsetDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }
}