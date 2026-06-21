package com.Toural.rating.RatingService.Repo;

import com.Toural.rating.RatingService.Models.HotelRatingAgg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRatingAggRepository extends JpaRepository<HotelRatingAgg, Long> {}
