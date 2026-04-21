package com.toural.AuthServer.AuthServer.DTO;


public class Request {
    private String userName;
    private String password;



    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Request(String userName, String password, String role) {
        this.userName = userName;
        this.password = password;
        this.role = role;
    }

    private String role;

    public Request() {
    }

    public Request(String userName, String password) {
        this.userName = userName;
        this.password = password;

    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String username) {
        this.userName = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
