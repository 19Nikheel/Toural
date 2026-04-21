package com.toural.HotelService.controllers;

import com.toural.HotelService.dtos.HotelNameRecDto;
import com.toural.HotelService.entities.Hotel;
import com.toural.HotelService.services.HotelRecommendationService;
import com.toural.HotelService.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommend")
public class RecommendationController {

    @Autowired
    private HotelRecommendationService hotelRecommendationService;
    @GetMapping
    public List<Hotel> recommendation(@RequestBody HotelNameRecDto  hotelNameRecDto){
        List<Hotel> hotels = hotelRecommendationService.findByHotelNameAndTopN(hotelNameRecDto);
        return hotels;
    }

}
