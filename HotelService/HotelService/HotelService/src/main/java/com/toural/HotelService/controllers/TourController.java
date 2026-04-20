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

    @GetMapping("/city-code/{cityCode}")
    public ResponseEntity<List<Tour>> findAll(@PathVariable String cityCode) {
        List<Tour> tours  = tourService.findByCityCode(cityCode);
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
        if (tour!=null) {
            Tour tour1 = tourService.updateTour(tour);
            return ResponseEntity.ok().body(tour1);
        }
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
}
