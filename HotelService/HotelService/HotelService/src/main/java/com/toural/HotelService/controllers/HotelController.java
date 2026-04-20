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

    @PutMapping("/{hotelId}")
    public ResponseEntity<Hotel> updateHotel(
            @PathVariable String hotelId,
            @RequestBody Hotel hotelRequest
    ) {
        Hotel updated = hotelService.updateHotel(hotelId, hotelRequest);
        return ResponseEntity.ok(updated);
    }


}
