package com.Toural.UserService.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_profile")
public class UserProfile {
    @EmbeddedId
    private UserProfileId id;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "address", columnDefinition = "text")
    private String address;

    @Column(name = "profile_picture", columnDefinition = "text")
    private String profilePicture;


    @Column(name = "created_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = OffsetDateTime.now();
        }
        if (this.updatedAt == null) {
            this.updatedAt = this.createdAt;
        }
    }

    @PreUpdate
    public void preUpdate() {
        // only set updatedAt if backend hasn't supplied one (so backend control is preserved)
        if (this.updatedAt == null) {
            this.updatedAt = OffsetDateTime.now();
        }
    }

}
