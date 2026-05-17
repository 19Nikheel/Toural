package com.toural.HotelService.controllers;

import com.toural.HotelService.dtos.HotelNameRecDto;
import com.toural.HotelService.entities.Hotel;
import com.toural.HotelService.services.HotelRecommendationService;
import com.toural.HotelService.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommend")
public class RecommendationController {

    @Autowired
    private HotelRecommendationService hotelRecommendationService;
    @PostMapping
    public List<Hotel> recommendation(@RequestBody HotelNameRecDto  hotelNameRecDto){
        List<Hotel> hotels = hotelRecommendationService.findByHotelNameAndTopN(hotelNameRecDto);
        return hotels;
    }

}
