package com.toural.AuthServer.AuthServer.DTO;



public class JwtResponce {
    private String Jwttoken;
    private String role;
    private String username;

    public String getJwttoken() {
        return Jwttoken;
    }

    public void setJwttoken(String jwttoken) {
        Jwttoken = jwttoken;
    }





    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public JwtResponce(String jwttoken,  String role, String username) {
        Jwttoken = jwttoken;

        this.role = role;
        this.username = username;
    }

    public JwtResponce() {
    }
    public static class builder {
        private String jwttoken;

        private String role;
        private String username;


    }


}
