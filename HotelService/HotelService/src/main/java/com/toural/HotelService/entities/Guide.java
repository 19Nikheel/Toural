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
@Document(collection = "guides")
public class Guide {
    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String guideId;

    private String name;
    private String cityName;
    @Indexed
    private String cityCode;
    private String stateName;

    private List<String> languages = new ArrayList<>();
    private String specialization;
    private Integer experience;
    private Double rating;
    private Double pricePerDay;
    private String phone;
    private String bio;
    private Boolean isAvailable;
}
