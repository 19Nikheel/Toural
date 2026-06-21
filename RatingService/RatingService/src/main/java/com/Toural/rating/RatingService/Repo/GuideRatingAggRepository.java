package com.Toural.rating.RatingService.Repo;


import com.Toural.rating.RatingService.Models.GuideRatingAgg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuideRatingAggRepository extends JpaRepository<GuideRatingAgg, Long> {}
