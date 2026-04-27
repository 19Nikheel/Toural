package com.toural.BookingService.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.toural.BookingService.dtos.BookingDto;
import com.toural.BookingService.services.PaymentService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Value("${razorpay.api.secret}")
    private String secret;
    @Value("${razorpay.api.key}")
    private String key;
    @PostMapping
    public ResponseEntity<?> payment(@RequestBody BookingDto payment) throws RazorpayException {
//        try {
//            Order payment1 = paymentService.payment(Integer.parseInt("100"), "201");
//            return ResponseEntity.ok().body(payment1);
//        } catch (RazorpayException e) {
//            System.out.println(e.getMessage());
//            return ResponseEntity.internalServerError().body("Razorpay error");
//        }
        int amount = 1000;

        RazorpayClient client = new RazorpayClient(key, secret);

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100);
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(options);

        // 🔥 Convert to JSON map
        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));

        return ResponseEntity.ok(response);
    }


    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        Map<String, String> res = new HashMap<>();
        res.put("status", "success");
//
//        String orderId = data.get("razorpay_order_id");
//        String paymentId = data.get("razorpay_payment_id");
//        String signature = data.get("razorpay_signature");
//
//        try {
//            String payload = orderId + "|" + paymentId;
//
//            String generatedSignature = hmacSHA256(payload, secret);

//            if (generatedSignature.equals(signature)) {
                return ResponseEntity.ok(res);
//            } else {
//                return ResponseEntity.status(400).body("Invalid signature");
//            }
//
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error verifying payment");
//        }
    }
    public static String hmacSHA256(String data, String key) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(secretKey);
        byte[] rawHmac = mac.doFinal(data.getBytes());

        StringBuilder hex = new StringBuilder();
        for (byte b : rawHmac) {
            String hexChar = Integer.toHexString(0xff & b);
            if (hexChar.length() == 1) hex.append('0');
            hex.append(hexChar);
        }
        return hex.toString();
    }
}
