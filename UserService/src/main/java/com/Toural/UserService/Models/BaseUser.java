package com.Toural.UserService.Models;


import com.Toural.UserService.Util.EmailBucket;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "base_user_core",
        uniqueConstraints = @UniqueConstraint(columnNames = {"email_bucket", "email_norm"}))
public class BaseUser {

    public static final int PARTITIONS = 16;
    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name="name",nullable = false)
    String name;

    @Column(name="email",nullable = false)
    String email;

    @Column(name="email_norm",nullable = false)
    String normEmail;


    @Column(name = "email_bucket", nullable = false)
    private Integer emailBucket;

    @Column(name="phone_no",nullable = false)
    String phoneNo;

    @Column(name="user_type",nullable = false)
    String type;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @PrePersist
    @PreUpdate
    private void computeEmailFields() {
        if (this.email == null) throw new IllegalStateException("email required");
        this.normEmail = EmailBucket.normalize(this.email);
        this.emailBucket = EmailBucket.bucketFor(this.normEmail, PARTITIONS);
    }

}
