package com.toural.HotelService.controllers;

import com.toural.HotelService.entities.Place;
import com.toural.HotelService.repos.PlaceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/places")
public class PlaceController {

    @Autowired
    private PlaceRepo placeRepo;

    // 🔹 Get all
    @GetMapping
    public ResponseEntity<List<Place>> getAll() {
        List<Place> places = placeRepo.findAll();
        return places.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(places);
    }

    // 🔹 By city
    @GetMapping("/city/{city}")
    public ResponseEntity<List<Place>> byCity(@PathVariable String city) {
        List<Place> places = placeRepo.findByCityIgnoreCase(city);
        return places.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(places);
    }

    // 🔹 By state
    @GetMapping("/state/{state}")
    public ResponseEntity<List<Place>> byState(@PathVariable String state) {
        List<Place> places = placeRepo.findByStateIgnoreCase(state);
        return places.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(places);
    }

    // 🔹 By city + rating
    @GetMapping("/city/{city}/rating/{rating}")
    public ResponseEntity<List<Place>> byCityRating(
            @PathVariable String city,
            @PathVariable Double rating
    ) {
        List<Place> places =
                placeRepo.findByCityIgnoreCaseAndGoogleReviewRatingGreaterThanEqual(city, rating);

        return places.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(places);
    }

    // 🔹 By state + rating
    @GetMapping("/state/{state}/rating/{rating}")
    public ResponseEntity<List<Place>> byStateRating(
            @PathVariable String state,
            @PathVariable Double rating
    ) {
        List<Place> places =
                placeRepo.findByStateIgnoreCaseAndGoogleReviewRatingGreaterThanEqual(state, rating);

        return places.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(places);
    }

    // 🔹 By city + type
    @GetMapping("/city/{city}/type/{type}")
    public ResponseEntity<List<Place>> byCityType(
            @PathVariable String city,
            @PathVariable String type
    ) {
        List<Place> places =
                placeRepo.findByCityIgnoreCaseAndTypeIgnoreCase(city, type);

        return places.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(places);
    }

    // 🔹 Combined filter (city + type + rating)
    @GetMapping("/filter")
    public ResponseEntity<List<Place>> filter(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double rating
    ) {

        List<Place> places = placeRepo.findAll();

        if (city != null) {
            places = places.stream()
                    .filter(p -> p.getCity().equalsIgnoreCase(city))
                    .toList();
        }

        if (state != null) {
            places = places.stream()
                    .filter(p -> p.getState().equalsIgnoreCase(state))
                    .toList();
        }

        if (type != null) {
            places = places.stream()
                    .filter(p -> p.getType().equalsIgnoreCase(type))
                    .toList();
        }

        if (rating != null) {
            places = places.stream()
                    .filter(p -> p.getGoogleReviewRating() >= rating)
                    .toList();
        }

        return places.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(places);
    }

    // 🔹 Add place
    @PostMapping
    public ResponseEntity<Place> add(@RequestBody Place place) {
        return ResponseEntity.ok(placeRepo.save(place));
    }
}
