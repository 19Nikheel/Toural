package com.toural.HotelService.repos;

import com.toural.HotelService.entities.Hotel;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelRepo extends MongoRepository<Hotel, ObjectId> {
    List<Hotel> findByCityCode(String cityCode);
    Optional<Hotel> findByHotelId(String hotelId);
}