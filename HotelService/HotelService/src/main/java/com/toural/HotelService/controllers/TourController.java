package com.toural.HotelService.controllers;

import com.toural.HotelService.entities.Tour;
import com.toural.HotelService.services.TourService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tours")
public class TourController {
    @Autowired
    private TourService tourService;

    @GetMapping("/top")
    public List<Tour> getTopPlaces() {
        return tourService.getTop5Places();
    }

    @GetMapping("/city-let/{let}")
    public ResponseEntity<?> findCities(@PathVariable String let){
        List<Tour> tours = tourService.findByCityContainingIgnoreCase(let);
        if (tours!=null && !tours.isEmpty()){
            return ResponseEntity.ok(tours);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Tour>> findAll() {
        List<Tour> tours  = tourService.findAll();
        if(tours!=null && tours.size()>0) {
            return ResponseEntity.ok().body(tours);
        }
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Tour> findById(@PathVariable ObjectId id){
        Tour byId = tourService.findById(id);
        if(byId!=null) {
            return ResponseEntity.ok().body(byId);
        }
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Tour>> findAll(@PathVariable String city) {
        List<Tour> tours  = tourService.findByCityContainingIgnoreCase(city);
        if(tours!=null && tours.size()>0) {
            return ResponseEntity.ok().body(tours);
        }
        return ResponseEntity.ok().body(null);
    }

    @PostMapping
    public ResponseEntity<Tour> addTour(@RequestBody Tour tour) {
        Tour tour1 = tourService.addTour(tour);
        if (tour1 != null) {
            return ResponseEntity.ok().body(tour1);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping
    public ResponseEntity<Tour> updateTour(@RequestBody Tour tour) {
//        if (tour!=null) {
//            Tour tour1 = tourService.updateTour(tour);
//            return ResponseEntity.ok().body(tour1);
//        }
        return ResponseEntity.badRequest().build();
    }
    @PutMapping("/id/{id}")
    public ResponseEntity<Tour> updateTour(@PathVariable ObjectId id) {
        if (id!=null) {
            Tour tour1 = tourService.updateTour(id);
            return ResponseEntity.ok().body(tour1);
        }
        return ResponseEntity.badRequest().build();
    }

    @Autowired
    private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    @GetMapping("/filter")
    public ResponseEntity<java.util.Map<String, Object>> filterTours(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int limit
    ) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query();

        if (city != null && !city.trim().isEmpty()) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("city").regex(city.trim(), "i"));
        }
        
        if (search != null && !search.trim().isEmpty()) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("name").regex(search.trim(), "i"));
        }

        long total = mongoTemplate.count(query, Tour.class);
        int totalPages = (int) Math.ceil((double) total / limit);

        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page - 1, limit);
        query.with(pageable);

        List<Tour> data = mongoTemplate.find(query, Tour.class);

        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("data", data);
        response.put("totalPages", totalPages == 0 ? 1 : totalPages);
        response.put("currentPage", page);

        return ResponseEntity.ok(response);
    }
}
