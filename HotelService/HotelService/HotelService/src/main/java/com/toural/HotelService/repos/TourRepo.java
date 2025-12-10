package com.toural.HotelService.repos;

import com.toural.HotelService.entities.Tour;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepo extends MongoRepository<Tour, ObjectId> {
    List<Tour> findByCityCode(String cityCode);
}
