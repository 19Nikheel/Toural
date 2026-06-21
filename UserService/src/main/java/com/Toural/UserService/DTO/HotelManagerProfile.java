package com.Toural.UserService.DTO;

import jakarta.persistence.Column;

public class HotelManagerProfile {
    private String email;
    private String phoneNo;
    private String type;
    private String managedHotelId;

    private String phoneOffice;

    public HotelManagerProfile(String email, String phoneNo, String type, String managedHotelId, String phoneOffice) {
        this.email = email;
        this.phoneNo = phoneNo;
        this.type = type;
        this.managedHotelId = managedHotelId;
        this.phoneOffice = phoneOffice;
    }

    public HotelManagerProfile() {
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

    public String getManagedHotelId() {
        return managedHotelId;
    }

    public void setManagedHotelId(String managedHotelId) {
        this.managedHotelId = managedHotelId;
    }

    public String getPhoneOffice() {
        return phoneOffice;
    }

    public void setPhoneOffice(String phoneOffice) {
        this.phoneOffice = phoneOffice;
    }
}
