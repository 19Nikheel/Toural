package com.toural.BookingService.repos;

import com.toural.BookingService.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(String userId);
    java.util.Optional<Booking> findByRazorpayOrderId(String razorpayOrderId);
}
