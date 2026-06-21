package com.toural.HotelService.controllers;

import com.toural.HotelService.entities.City;
import com.toural.HotelService.entities.Hotel;
import com.toural.HotelService.entities.State;
import com.toural.HotelService.repos.CityRepo;
import com.toural.HotelService.repos.HotelRepo;
import com.toural.HotelService.repos.StateRepo;
import com.toural.HotelService.services.HotelService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.text.Normalizer;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("hotels")
public class HotelController {
    @Autowired
    private HotelService hotelService;

    @Autowired
    private HotelRepo hotelRepo;
    @Autowired
    private CityRepo cityRepo;
    @Autowired
    private StateRepo stateRepo;
    @GetMapping
    public List<Hotel> findHotels(){
        return hotelService.findAll();
    }

    @PostMapping
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel){
        City city = cityRepo.findByCityName(hotel.getCityName()).get();
        if (city!=null){
            ObjectId objectId = new ObjectId();
            hotel.setId(objectId);
            hotel.setHotelId(city.getCityCode()+objectId);
            hotel.setCityCode(city.getCityCode());
            Hotel hotel1 = hotelService.addNewHotel(hotel);
            return ResponseEntity.ok(hotel1);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("hotel-by-city-code/{cityCode}")
    public ResponseEntity<List<Hotel>> findHotelByCityCode(@PathVariable String cityCode){
        List<Hotel> hotels = hotelService.findByCityCode(cityCode);
        if (hotels!=null && !hotels.isEmpty()){
            return ResponseEntity.ok(hotels);
        }
        return ResponseEntity.noContent().build();
    }
    @GetMapping("hotel-by-city/{city}")
    public ResponseEntity<List<Hotel>> findHotelByCity(@PathVariable String city){
        List<Hotel> hotels = hotelService.findByCityName(city);
        if (hotels!=null && !hotels.isEmpty()){
            return ResponseEntity.ok(hotels);
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{hotelId}")
    public ResponseEntity<Hotel> updateHotel(
            @PathVariable String hotelId,
            @RequestBody Hotel hotelRequest
    ) {
        Hotel updated = hotelService.updateHotel(hotelId, hotelRequest);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{hotelId}")
    public ResponseEntity<Hotel> findHotelById(@PathVariable String hotelId){
        Hotel hotel = hotelRepo.findByHotelId(hotelId).get();
        return ResponseEntity.ok(hotel);
    }

    @Autowired
    private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    @GetMapping("/filter")
    public ResponseEntity<java.util.Map<String, Object>> filterHotels(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double rating,
            @RequestParam(required = false) String hasPool,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int limit
    ) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query();
        
        if (city != null && !city.trim().isEmpty()) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("cityName").regex(city.trim(), "i"));
        }
        
        if (search != null && !search.trim().isEmpty()) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("hotelName").regex(search.trim(), "i"));
        }
        
        if (rating != null && rating > 0) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("rating").gte(rating));
        }
        
        if (hasPool != null && !hasPool.equalsIgnoreCase("any")) {
            boolean poolVal = hasPool.equalsIgnoreCase("yes");
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("hasPool").is(poolVal));
        }
        
        long total = mongoTemplate.count(query, Hotel.class);
        int totalPages = (int) Math.ceil((double) total / limit);
        
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page - 1, limit);
        query.with(pageable);
        
        List<Hotel> data = mongoTemplate.find(query, Hotel.class);
        
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("data", data);
        response.put("totalPages", totalPages == 0 ? 1 : totalPages);
        response.put("currentPage", page);
        
        return ResponseEntity.ok(response);
    }
}
