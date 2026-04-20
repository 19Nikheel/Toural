package com.toural.AuthServer.AuthServer.DTO;


public class Request {
    private String username;
    private String password;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Request(String userName, String password, String role) {
        this.username = userName;
        this.password = password;
        this.role = role;
    }

    private String role;

    public Request() {
    }

    public Request(String userName, String password) {
        this.username = userName;
        this.password = password;

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
}
