package com.toural.HotelService.controllers;

import com.toural.HotelService.entities.Car;
import com.toural.HotelService.repos.CarRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarRepo carRepo;

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.ok(carRepo.findAll());
    }

    @GetMapping("/{carId}")
    public ResponseEntity<Car> getCarById(@PathVariable String carId) {
        return carRepo.findByCarId(carId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/city/{cityCode}")
    public ResponseEntity<List<Car>> getCarsByCity(@PathVariable String cityCode) {
        return ResponseEntity.ok(carRepo.findByCityCode(cityCode));
    }

    @GetMapping("/city-name/{cityName}")
    public ResponseEntity<List<Car>> getCarsByCityName(@PathVariable String cityName) {
        return ResponseEntity.ok(carRepo.findByCityNameIgnoreCase(cityName));
    }

    @GetMapping("/state/{stateName}")
    public ResponseEntity<List<Car>> getCarsByState(@PathVariable String stateName) {
        return ResponseEntity.ok(carRepo.findByStateName(stateName));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Car>> getCarsByType(@PathVariable String type) {
        return ResponseEntity.ok(carRepo.findByType(type));
    }

    @PostMapping
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        return ResponseEntity.ok(carRepo.save(car));
    }
}
