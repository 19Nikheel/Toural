package com.toural.HotelService.entities;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document(collection = "tours")
public class Tour {
    @Id
    private ObjectId id;
    private String hotelName;
    private String name;
    private String description;
    private Double price;
    private ArrayList<String> image;
    @Indexed
    private String cityName;
    @Indexed
    private String cityCode;
    private String tags;
    private String bestSeason;
    private ArrayList<String> highlights;
    @DBRef
    private ArrayList<Hotel> hotels;
}
