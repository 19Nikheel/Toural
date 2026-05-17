package com.toural.AuthServer.AuthServer.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostSign {
    private Long userId;
    private String name;
    private String email;
    private String phoneNo;
    private String type;
}
