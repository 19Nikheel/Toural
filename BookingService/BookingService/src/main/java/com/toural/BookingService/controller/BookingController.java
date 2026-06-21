package com.toural.BookingService.controller;

import com.toural.BookingService.dtos.BookingRequest;
import com.toural.BookingService.entities.Booking;
import com.toural.BookingService.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(request);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long bookingId) {
        Booking booking = bookingService.getBooking(bookingId);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String userId) {
        List<Booking> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }
}
