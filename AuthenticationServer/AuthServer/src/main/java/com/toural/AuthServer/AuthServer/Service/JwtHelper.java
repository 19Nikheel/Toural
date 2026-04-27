package com.toural.AuthServer.AuthServer.Service;

import com.toural.AuthServer.AuthServer.Entity.AuthUser;
import com.toural.AuthServer.AuthServer.Repo.AuthUserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtHelper {

    @Autowired
    private AuthUserRepo userrepo;

    //requirement :
    public static final long JWT_TOKEN_VALIDITY = 36 * 60 * 60;

    //    public static final long JWT_TOKEN_VALIDITY =  60;
    @Value("${jwt.secret.key}")
    private String secret;

    //retrieve username from jwt token
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    //retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    //for retrieveing any information from token we will need the secret key
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    public int getTokenIDFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        Claims body = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return body.get("tokenId", Integer.class);
    }


    //check if the token has expired
    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    //generate token for user
    public String generateToken(String role, String userId) {

//        AuthUser user = userrepo.findByUsername(userDetails.getUsername())
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Map<String, Object> claims = new HashMap<>();

        //claims.put("email",);
        claims.put("role", role);
        return doGenerateToken(claims, userId);
    }

    public String generateTokenlimit(UserDetails userDetails) {

        AuthUser user = userrepo.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "otp");

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 150 * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }


    public String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    //validate token
    public Boolean validateToken(String token) { //, UserDetails userDetails
//        final String username = getUsernameFromToken(token);
//        int tokenId = getTokenIDFromToken(token);
//username.equals(userDetails.getUsername()) &&
        return (!isTokenExpired(token));
    }
}
