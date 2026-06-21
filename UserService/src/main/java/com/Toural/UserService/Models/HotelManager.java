package com.Toural.UserService.Models;



import java.time.OffsetDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@Table(name = "hotel_manager")
public class HotelManager {

    @EmbeddedId
    private UserProfileId id;


    // store JSON as String (or use AttributeConverter / hibernate-types for List<Map<String,Object>>)
    @Column(name = "managed_hotel_id", nullable = true)
    private String managedHotelId;

    @Column(name = "phone_office", nullable = false)
    private String phoneOffice;

    @Column(name = "office_address", columnDefinition = "text", nullable = false)
    private String officeAddress;


    @Column(name = "created_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime updatedAt;

    public HotelManager() {}

    public HotelManager(UserProfileId id) {
        this.id = id;
    }



    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
        if (updatedAt == null) updatedAt = createdAt;

    }

    @PreUpdate
    public void preUpdate() {
        if (updatedAt == null) updatedAt = OffsetDateTime.now();
    }
}
