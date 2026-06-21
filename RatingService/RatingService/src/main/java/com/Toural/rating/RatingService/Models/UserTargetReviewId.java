package com.Toural.rating.RatingService.Models;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class UserTargetReviewId implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "target_type", nullable = false, length = 50)
    private String targetType;

    @Column(name = "target_id", nullable = false)
    private Long targetId;

    public UserTargetReviewId() {}

    public UserTargetReviewId(Long userId, String targetType, Long targetId) {
        this.userId = userId;
        this.targetType = targetType;
        this.targetId = targetId;
    }

    // getters & setters

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTargetType() { return targetType; }
    public void setTargetType(String targetType) { this.targetType = targetType; }

    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserTargetReviewId)) return false;
        UserTargetReviewId that = (UserTargetReviewId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(targetType, that.targetType) &&
                Objects.equals(targetId, that.targetId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, targetType, targetId);
    }
}