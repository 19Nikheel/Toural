package com.Toural.UserService.Service;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtHelper {

    //requirement :
    public static final long JWT_TOKEN_VALIDITY =  36* 60 * 60;

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

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    //for retrieveing any information from token we will need the secret key
    public Claims getAllClaimsFromToken(String token) {
        //Key key = Keys.hmacShaKeyFor(secret.getBytes());

        return  Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }



    //check if the token has expired
    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    //generate token for user


    //validate token
    public Boolean validateToken(String token) {
        //final String username = getUsernameFromToken(token);
        return  !isTokenExpired(token);
    }
}
