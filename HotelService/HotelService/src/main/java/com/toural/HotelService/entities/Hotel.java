package com.toural.HotelService.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "hotels")
public class Hotel {
    @Id
    private ObjectId id;
    @Indexed(unique = true)
    private String hotelId;
    private String hotelName;
    private String description;
    private String stateName;
    private String cityName;
    private String addressLine;

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getPincode() {
        return pincode;
    }

    private String pincode;
    private Integer singleRoom;
    private Integer doubleRoom;
    private Integer suite;
    private Integer familyRoom;
    private Boolean hasPool;
    private Double rating;
    @Indexed
    private String cityCode;
    private List<String> images = new ArrayList<>();

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getHotelId() {
        return hotelId;
    }

    public void setHotelId(String hotelId) {
        this.hotelId = hotelId;
    }


    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }



    public Integer getSingleRoom() {
        return singleRoom;
    }

    public void setSingleRoom(Integer singleRoom) {
        this.singleRoom = singleRoom;
    }

    public Integer getDoubleRoom() {
        return doubleRoom;
    }

    public void setDoubleRoom(Integer doubleRoom) {
        this.doubleRoom = doubleRoom;
    }

    public Integer getSuite() {
        return suite;
    }

    public void setSuite(Integer suite) {
        this.suite = suite;
    }

    public Integer getFamilyRoom() {
        return familyRoom;
    }

    public void setFamilyRoom(Integer familyRoom) {
        this.familyRoom = familyRoom;
    }

    public Boolean getHasPool() {
        return hasPool;
    }

    public void setHasPool(Boolean hasPool) {
        this.hasPool = hasPool;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getPolicies() {
        return policies;
    }

    public void setPolicies(List<String> policies) {
        this.policies = policies;
    }

    private List<String> policies = new ArrayList<>();
}
