package com.Toural.rating.RatingService.Repo;


import com.Toural.rating.RatingService.Models.UserTargetReview;
import com.Toural.rating.RatingService.Models.UserTargetReviewId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTargetReviewRepository extends JpaRepository<UserTargetReview, UserTargetReviewId> {
    List<UserTargetReview> findByUserId(Long userId);
    List<UserTargetReview> findByTargetTypeAndTargetId(String type, Long targetId);
}