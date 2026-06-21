package com.toural.HotelService.repos;

import com.toural.HotelService.entities.Guide;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GuideRepo extends MongoRepository<Guide, ObjectId> {
    Optional<Guide> findByGuideId(String guideId);
    List<Guide> findByCityCode(String cityCode);
    List<Guide> findByCityName(String cityName);
    List<Guide> findByCityNameIgnoreCase(String cityName);
    List<Guide> findByStateName(String stateName);
    List<Guide> findBySpecialization(String specialization);
}
