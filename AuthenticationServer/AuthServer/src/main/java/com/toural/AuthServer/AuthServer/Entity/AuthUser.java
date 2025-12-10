package com.toural.AuthServer.AuthServer.Entity;


import jakarta.persistence.*;


@Entity

@Table(name="AuthUser")
public class AuthUser {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @jakarta.persistence.Id
    private long Id;

    @Column(unique = true ,nullable = false)
    private String username;

    @Column(unique = true ,nullable = false)
    private String password;


    @Column(unique = true ,nullable = false)
    private String role;

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public AuthUser() {
    }

    public AuthUser(long id, String username, String password, String role) {
        Id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }



}
