package com.toural.BookingService.services;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Value("${razorpay.api.key}")
    private String apiKey;
    @Value("${razorpay.api.secret}")
    private String apiSecret;
    public Order payment(double amount, Long bookingId) throws RazorpayException {
        RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
        JSONObject body = new JSONObject();
        body.put("amount", (int)(amount * 100));
        body.put("currency", "INR");
        body.put("receipt", "txn_" + bookingId);
        Order order = razorpay.orders.create(body);
        return order;
    }
}
