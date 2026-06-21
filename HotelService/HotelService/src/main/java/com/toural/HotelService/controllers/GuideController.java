package com.toural.HotelService.controllers;

import com.toural.HotelService.entities.Guide;
import com.toural.HotelService.repos.GuideRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guides")
public class GuideController {

    @Autowired
    private GuideRepo guideRepo;

    @GetMapping
    public ResponseEntity<List<Guide>> getAllGuides() {
        return ResponseEntity.ok(guideRepo.findAll());
    }

    @GetMapping("/{guideId}")
    public ResponseEntity<Guide> getGuideById(@PathVariable String guideId) {
        return guideRepo.findByGuideId(guideId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/city/{cityCode}")
    public ResponseEntity<List<Guide>> getGuidesByCity(@PathVariable String cityCode) {
        return ResponseEntity.ok(guideRepo.findByCityCode(cityCode));
    }

    @GetMapping("/city-name/{cityName}")
    public ResponseEntity<List<Guide>> getGuidesByCityName(@PathVariable String cityName) {
        return ResponseEntity.ok(guideRepo.findByCityNameIgnoreCase(cityName));
    }

    @GetMapping("/state/{stateName}")
    public ResponseEntity<List<Guide>> getGuidesByState(@PathVariable String stateName) {
        return ResponseEntity.ok(guideRepo.findByStateName(stateName));
    }

    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<Guide>> getGuidesBySpecialization(@PathVariable String specialization) {
        return ResponseEntity.ok(guideRepo.findBySpecialization(specialization));
    }

    @PostMapping
    public ResponseEntity<Guide> addGuide(@RequestBody Guide guide) {
        return ResponseEntity.ok(guideRepo.save(guide));
    }
}
