package com.toural.HotelService.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "places")
public class Tour {
    @Id
    private ObjectId id;

    private String zone;
    private String state;
    private String city;
    private String name;
    private String type;
    private String establishment_year;
    private String time_needed_to_visit_in_hrs;
    private String google_review_rating;
    private String entrance_fee_in_inr;
    private String airport_with_50km_radius;
    private String weekly_off;
    private String significance;
    private String dslr_allowed;
    private String number_of_google_review_in_lakhs;
    private String best_time_to_visit;
    private String score;
    private String features;
    private String uniq_id;
}
