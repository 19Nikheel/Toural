package com.toural.HotelService.repos;
import com.toural.HotelService.entities.City;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepo extends MongoRepository<City, ObjectId> {
    Optional<City> findByCityCode(String cityCode);
    void deleteByStateName(String stateName);
    Optional<City> findByCityName(String cityName);
    @Query("{ 'cityName': { $regex: ?0, $options: 'i' } }")
    List<City> findByCityNameContainingIgnoreCase(String letters);
}
