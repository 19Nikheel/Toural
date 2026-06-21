package com.toural.BookingService.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "booking_table")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    @Column(name = "user_id", nullable = false)
    private String userId;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "item_type", nullable = false)
    private ItemType itemType;

    @Column(name = "item_id", nullable = false)
    private String itemId;
    private double totalPrice;
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    private LocalDateTime bookingDate;
    private int bookingDuration;
    private String paymentId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
}