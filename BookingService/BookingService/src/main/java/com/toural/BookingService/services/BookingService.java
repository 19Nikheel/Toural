package com.toural.BookingService.services;

import com.toural.BookingService.dtos.BookingRequest;
import com.toural.BookingService.entities.Booking;
import com.toural.BookingService.entities.BookingStatus;
import com.toural.BookingService.entities.Inventory;
import com.toural.BookingService.entities.ItemType;
import com.toural.BookingService.entities.PaymentLog;
import com.toural.BookingService.repos.BookingRepository;
import com.toural.BookingService.repos.InventoryRepository;
import com.toural.BookingService.repos.PaymentLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.razorpay.Order;
import com.razorpay.RazorpayException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private PaymentLogRepository paymentLogRepository;

    @Autowired
    private PaymentService paymentService;

    @Transactional
    public Booking createBooking(BookingRequest request) {
        double totalPrice = 0;

        if (ItemType.PACKAGE.equals(request.getItemType())) {
            // Package payload: HOTEL:h1,GUIDE:g1,CAR:c1
            String[] items = request.getItemId().split(",");
            for (String itemStr : items) {
                String[] parts = itemStr.split(":");
                if (parts.length != 2) continue;
                String typeStr = parts[0];
                String id = parts[1];
                
                ItemType type = ItemType.valueOf(typeStr);
                
                Inventory inventory = inventoryRepository.findByItemTypeAndItemId(type, id)
                        .orElseThrow(() -> new RuntimeException("Inventory not found for " + type + " with id " + id));

                if (!inventory.isAvailable() || inventory.getAvailableCount() < 1) {
                    throw new RuntimeException("The " + type + " is currently unavailable for booking.");
                }
                
                totalPrice += inventory.getPrice() * request.getDuration();
            }
        } else {
            // 1. Verify inventory
            Inventory inventory = inventoryRepository.findByItemTypeAndItemId(request.getItemType(), request.getItemId())
                    .orElseThrow(() -> new RuntimeException("Inventory not found for " + request.getItemType() + " with id " + request.getItemId()));

            if (!inventory.isAvailable()) {
                throw new RuntimeException("The " + request.getItemType() + " is currently closed and unavailable for booking.");
            }

            if (inventory.getAvailableCount() < 1) {
                throw new RuntimeException("No available items for " + request.getItemType());
            }

            // 2. Calculate price
            totalPrice = inventory.getPrice() * request.getDuration();
        }

        // 3. Save pending booking
        Booking booking = new Booking();
        booking.setUserId(request.getUserId());
        booking.setItemType(request.getItemType());
        booking.setItemId(request.getItemId());
        booking.setBookingDuration(request.getDuration());
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.PENDING);
        booking.setBookingDate(LocalDateTime.now());
        
        booking = bookingRepository.save(booking);

        // 4. Create Razorpay Order
        try {
            Order order = paymentService.payment(totalPrice, booking.getBookingId());
            booking.setRazorpayOrderId(order.get("id"));
            bookingRepository.save(booking);
        } catch (RazorpayException e) {
            throw new RuntimeException("Error creating Razorpay order", e);
        }

        return booking;
    }

    @Transactional
    public Booking completeBookingPayment(String razorpayOrderId, String razorpayPaymentId) {
        Booking booking = bookingRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Booking not found for order " + razorpayOrderId));

        booking.setStatus(BookingStatus.SUCCESS);
        booking.setRazorpayPaymentId(razorpayPaymentId);
        booking = bookingRepository.save(booking);

        if (ItemType.PACKAGE.equals(booking.getItemType())) {
            String[] items = booking.getItemId().split(",");
            for (String itemStr : items) {
                String[] parts = itemStr.split(":");
                if (parts.length != 2) continue;
                String typeStr = parts[0];
                String id = parts[1];
                
                ItemType type = ItemType.valueOf(typeStr);
                
                Inventory inventory = inventoryRepository.findByItemTypeAndItemId(type, id)
                        .orElseThrow(() -> new RuntimeException("Inventory not found"));
                inventory.setAvailableCount(inventory.getAvailableCount() - 1);
                inventoryRepository.save(inventory);
            }
        } else {
            Inventory inventory = inventoryRepository.findByItemTypeAndItemId(booking.getItemType(), booking.getItemId())
                    .orElseThrow(() -> new RuntimeException("Inventory not found"));
            inventory.setAvailableCount(inventory.getAvailableCount() - 1);
            inventoryRepository.save(inventory);
        }

        PaymentLog log = new PaymentLog();
        log.setBookingId(booking.getBookingId());
        log.setPaymentId(razorpayPaymentId);
        log.setStatus("SUCCESS");
        log.setMessage("Payment verified successfully");
        log.setTimestamp(LocalDateTime.now());
        paymentLogRepository.save(log);

        return booking;
    }

    public Booking getBooking(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id " + bookingId));
    }

    public List<Booking> getUserBookings(String userId) {
        return bookingRepository.findByUserId(userId);
    }
}

