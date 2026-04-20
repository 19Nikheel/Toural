package com.toural.HotelService.controllers;

import com.toural.HotelService.entities.City;
import com.toural.HotelService.repos.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("city")
public class CityController {
    @Autowired
    private CityRepo cityRepo;

    @GetMapping("/city-let/{let}")
    public ResponseEntity<?> findCities(@PathVariable String let){
        List<City> cities = cityRepo.findByCityNameContainingIgnoreCase(let);
        if (cities!=null && !cities.isEmpty()){
            return ResponseEntity.ok(cities);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("city")
    public List<City> func4(){
        return cityRepo.findAll();
    }
    @GetMapping("/city-code/{cityCode}")
    public ResponseEntity<City> findCity(@PathVariable String cityCode){
        City city = cityRepo.findByCityCode(cityCode).get();
        if (city!=null){
            return ResponseEntity.ok(city);
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/city-name/{cityName}")
    public ResponseEntity<City> findCityName(@PathVariable String cityName){
        City city = cityRepo.findByCityName(cityName).get();
        if (city!=null){
            return ResponseEntity.ok(city);
        }
        return ResponseEntity.notFound().build();
    }
}
