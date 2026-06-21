package com.Toural.UserService.DTO;

import jakarta.persistence.Column;

import java.math.BigDecimal;

public class DriverProfile {
    private String name;

    public DriverProfile() {
    }

    public DriverProfile(String name, String email, String phoneNo, String type, String licenseNumber, String vehicleType, String vehicleModel, String vehicleNumber, Integer experienceYears, BigDecimal ratingAvg, Integer ratingCount) {
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
        this.type = type;
        this.licenseNumber = licenseNumber;
        this.vehicleType = vehicleType;
        this.vehicleModel = vehicleModel;
        this.vehicleNumber = vehicleNumber;
        this.experienceYears = experienceYears;
        this.ratingAvg = ratingAvg;
        this.ratingCount = ratingCount;
    }

    private String email;
    private String phoneNo;
    private String type;
    private String licenseNumber;

    private String vehicleType;

    private String vehicleModel;

    private String vehicleNumber;

    private Integer experienceYears;

    private BigDecimal ratingAvg;

    private Integer ratingCount;

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

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public BigDecimal getRatingAvg() {
        return ratingAvg;
    }

    public void setRatingAvg(BigDecimal ratingAvg) {
        this.ratingAvg = ratingAvg;
    }

    public Integer getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(Integer ratingCount) {
        this.ratingCount = ratingCount;
    }
}
