package com.toural.AuthServer.AuthServer.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="AuthUser")
public class AuthUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long userId;

    @Column(unique = true ,nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column( nullable = false)
    private String role;
}
