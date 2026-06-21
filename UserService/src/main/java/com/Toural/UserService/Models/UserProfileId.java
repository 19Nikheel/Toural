package com.Toural.UserService.Models;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class UserProfileId implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "email_bucket", nullable = false)
    private Integer emailBucket;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    public UserProfileId() {}

    public UserProfileId(Integer emailBucket, Long userId) {
        this.emailBucket = emailBucket;
        this.userId = userId;
    }

    public Integer getEmailBucket() {
        return emailBucket;
    }

    public void setEmailBucket(Integer emailBucket) {
        this.emailBucket = emailBucket;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserProfileId)) return false;
        UserProfileId that = (UserProfileId) o;
        return Objects.equals(emailBucket, that.emailBucket) &&
                Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(emailBucket, userId);
    }

    @Override
    public String toString() {
        return "UserProfileId{" +
                "emailBucket=" + emailBucket +
                ", userId=" + userId +
                '}';
    }
}
