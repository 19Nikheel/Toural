package com.toural.BookingService.controller;

import com.razorpay.RazorpayException;
import com.toural.BookingService.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment/")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public void payment(@RequestBody Payment payment) {
        try {
            paymentService.payment(Integer.parseInt(amount));
        } catch (RazorpayException e) {
            System.out.println(e.getMessage());
        }
    }

}
