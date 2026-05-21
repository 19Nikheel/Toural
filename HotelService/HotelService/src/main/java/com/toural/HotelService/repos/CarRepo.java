package com.toural.HotelService.repos;

import com.toural.HotelService.entities.Car;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepo extends MongoRepository<Car, ObjectId> {
    Optional<Car> findByCarId(String carId);
    List<Car> findByCityCode(String cityCode);
    List<Car> findByCityName(String cityName);
    List<Car> findByCityNameIgnoreCase(String cityName);
    List<Car> findByType(String type);
    List<Car> findByStateName(String stateName);
}
