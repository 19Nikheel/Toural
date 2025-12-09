package com.toural.HotelService.controllers;

import com.toural.HotelService.entities.City;
import com.toural.HotelService.entities.State;
import com.toural.HotelService.repos.CityRepo;
import com.toural.HotelService.repos.StateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/city")
public class CityController {
    @Autowired
    private CityRepo cityRepo;
    @Autowired
    private StateRepo stateRepo;

    @GetMapping("/city-let/{let}")
    public ResponseEntity<?> findCities(@PathVariable String let){
        List<City> cities = cityRepo.findByCityNameContainingIgnoreCase(let);
        if (cities!=null && !cities.isEmpty()){
            return ResponseEntity.ok(cities);
        }
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/state")
    public State func3(){
        return stateRepo.findByStateCode("01").get();
    }

    @GetMapping("/city")
    public List<City> func4(){
        return cityRepo.findAll();
    }
    @GetMapping("/city-code/{cityCode}")
    public City findCity(@PathVariable String cityCode){
        return cityRepo.findByCityCode(cityCode).get();
    }
    @GetMapping("/city-name/{cityName}")
    public City findCityName(@PathVariable String cityName){
        return cityRepo.findByCityName(cityName).get();
    }
}
