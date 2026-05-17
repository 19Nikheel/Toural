package com.toural.BookingService.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "payment_details_table")
public class PaymentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String paymentId;
    @Column(nullable = false)
    private String userId;
    @Column(nullable = false)
    private String bookingId;
    private String paymentDate;
    private String paymentStatus;
    private String paymentType;
    private String paymentAmount;
    private String paymentCurrency;
    private String paymentNote;
}
