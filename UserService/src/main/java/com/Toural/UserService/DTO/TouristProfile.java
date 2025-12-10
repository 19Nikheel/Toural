package com.Toural.UserService.DTO;

import jakarta.persistence.Column;

import java.math.BigDecimal;

public class TouristProfile {
    private String email;
    private String phoneNo;
    private String type;

    private String bio;

    private String languagesJson;

    private String[] certifications;

    private BigDecimal hourlyRate;

    private BigDecimal ratingAvg;

    private Integer ratingCount;

    private String location;

    private String availabilityJson;

    public TouristProfile(String email, String phoneNo, String type, String bio, String languagesJson, String[] certifications, BigDecimal hourlyRate, BigDecimal ratingAvg, Integer ratingCount, String location, String availabilityJson) {
        this.email = email;
        this.phoneNo = phoneNo;
        this.type = type;
        this.bio = bio;
        this.languagesJson = languagesJson;
        this.certifications = certifications;
        this.hourlyRate = hourlyRate;
        this.ratingAvg = ratingAvg;
        this.ratingCount = ratingCount;
        this.location = location;
        this.availabilityJson = availabilityJson;
    }

    public TouristProfile() {
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

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLanguagesJson() {
        return languagesJson;
    }

    public void setLanguagesJson(String languagesJson) {
        this.languagesJson = languagesJson;
    }

    public String[] getCertifications() {
        return certifications;
    }

    public void setCertifications(String[] certifications) {
        this.certifications = certifications;
    }

    public BigDecimal getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(BigDecimal hourlyRate) {
        this.hourlyRate = hourlyRate;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAvailabilityJson() {
        return availabilityJson;
    }

    public void setAvailabilityJson(String availabilityJson) {
        this.availabilityJson = availabilityJson;
    }
}
