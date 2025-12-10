package com.toural.AuthServer.AuthServer.DTO;

public class postSign {
    private String name;
    private String email;

    private String phoneNo;

    private String type;

    public postSign(String name, String email, String phoneNo, String type) {
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
        this.type = type;
    }

    public postSign() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
