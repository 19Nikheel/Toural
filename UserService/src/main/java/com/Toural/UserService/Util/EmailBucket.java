package com.Toural.UserService.Util;


import java.math.BigInteger;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
public class EmailBucket {
    private EmailBucket() {}

    public static int bucketFor(String rawEmail, int partitions) {
        if (rawEmail == null) throw new IllegalArgumentException("email null");
        try {
            String norm = normalize(rawEmail);
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(norm.getBytes(StandardCharsets.UTF_8));
            // use first 8 bytes (64 bits) as positive BigInteger
            byte[] first8 = new byte[8];
            System.arraycopy(digest, 0, first8, 0, 8);
            BigInteger bi = new BigInteger(1, first8);
            return bi.mod(BigInteger.valueOf(partitions)).intValue();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String normalize(String email) {
        // basic normalization: trim + lowercase; consider Unicode NFC if needed
        return email.trim().toLowerCase();
    }
}
