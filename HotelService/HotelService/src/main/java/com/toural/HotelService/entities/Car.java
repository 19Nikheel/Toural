package com.toural.HotelService.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "cars")
public class Car {
    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String carId;

    private String brand;
    private String model;
    private String type; // Sedan, SUV, Hatchback, Luxury
    private String cityName;
    @Indexed
    private String cityCode;
    private String stateName;

    private Integer seatingCapacity;
    private String fuelType; // Petrol, Diesel, Electric, CNG
    private String transmission; // Manual, Automatic

    private Double pricePerDay;
    private Double rating;
    private Boolean isAvailable;
}
