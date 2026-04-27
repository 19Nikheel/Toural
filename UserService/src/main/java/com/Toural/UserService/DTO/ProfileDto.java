package com.Toural.UserService.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDto {
    String userId;
    String name;
    String email;
    String phoneNo;
    String type;
    String dob;
    String address;
    String pic;
}
