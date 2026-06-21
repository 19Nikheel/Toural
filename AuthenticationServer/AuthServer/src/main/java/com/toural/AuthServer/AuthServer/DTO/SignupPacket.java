package com.toural.AuthServer.AuthServer.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupPacket {
    private String name;
    private String email;
    private String password;
    private String phoneNo;
    private String type;
}
