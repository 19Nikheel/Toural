package com.Toural.rating.RatingService.Repo;


import com.Toural.rating.RatingService.Models.UserTargetReview;
import com.Toural.rating.RatingService.Models.UserTargetReviewId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTargetReviewRepository extends JpaRepository<UserTargetReview, UserTargetReviewId> {

}