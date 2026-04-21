package com.toural.HotelService.repos;

import com.toural.HotelService.entities.State;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StateRepo extends MongoRepository<State, ObjectId> {
    Optional<State> findByStateCode(String stateCode);

    Optional<State> findByStateNameIgnoreCase(String stateName);
}
