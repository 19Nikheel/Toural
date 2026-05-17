package com.toural.AuthServer.AuthServer.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponce {
    private String jwtToken;
    private String role;
    private String username;
}
