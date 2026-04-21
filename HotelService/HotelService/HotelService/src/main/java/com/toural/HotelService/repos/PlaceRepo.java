package com.toural.HotelService.repos;

import com.toural.HotelService.entities.Place;
import com.toural.HotelService.entities.Tour;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepo extends MongoRepository<Place, ObjectId> {

    // 🔹 Basic filters
    List<Place> findByCityIgnoreCase(String city);
    List<Place> findByStateIgnoreCase(String state);

    // 🔹 By type
    List<Place> findByCityIgnoreCaseAndTypeIgnoreCase(String city, String type);
    List<Place> findByStateIgnoreCaseAndTypeIgnoreCase(String state, String type);

    // 🔹 By rating (greater than)
    List<Place> findByCityIgnoreCaseAndGoogleReviewRatingGreaterThanEqual(String city, Double rating);
    List<Place> findByStateIgnoreCaseAndGoogleReviewRatingGreaterThanEqual(String state, Double rating);

    // 🔹 Combined filters
    List<Place> findByCityIgnoreCaseAndTypeIgnoreCaseAndGoogleReviewRatingGreaterThanEqual(
            String city, String type, Double rating
    );

    List<Place> findByStateIgnoreCaseAndTypeIgnoreCaseAndGoogleReviewRatingGreaterThanEqual(
            String state, String type, Double rating
    );

    // 🔹 Search (contains)
    List<Place> findByCityIgnoreCaseAndNameContainingIgnoreCase(String city, String name);
}
