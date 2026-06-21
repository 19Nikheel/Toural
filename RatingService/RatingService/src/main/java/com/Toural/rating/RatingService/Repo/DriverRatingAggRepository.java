package com.Toural.rating.RatingService.Repo;


import com.Toural.rating.RatingService.Models.DriverRatingAgg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRatingAggRepository extends JpaRepository<DriverRatingAgg, Long> {

}
