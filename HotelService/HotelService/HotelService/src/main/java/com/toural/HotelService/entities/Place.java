package com.toural.HotelService.entities;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "places")
public class Place {
    @Id
    private ObjectId id;

    private String zone;
    private String state;
    private String city;
    private String name;
    private String type;

    private Integer establishmentYear;
    private Double timeNeededToVisitInHrs;
    private Double googleReviewRating;
    private Integer entranceFeeInInr;

    private String airportWith50kmRadius;
    private String weeklyOff;
    private String significance;
    private String dslrAllowed;

    private Double numberOfGoogleReviewInLakhs;
    private String bestTimeToVisit;

    private Double score;
    private String features;

    private Integer uniqId;

}
