package com.Toural.rating.RatingService.services;

import com.Toural.rating.RatingService.Models.UserTargetReview;
import com.Toural.rating.RatingService.Models.UserTargetReviewId;
import com.Toural.rating.RatingService.Repo.RatingAggRepository;
import com.Toural.rating.RatingService.Repo.UserTargetReviewRepository;
import com.Toural.rating.RatingService.dtos.ReviewDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class UserTargetReviewService {

    private final UserTargetReviewRepository repo;
    private final RatingAggRepository aggRepo;

    public UserTargetReviewService(UserTargetReviewRepository repo,
                                   RatingAggRepository aggRepo) {
        this.repo = repo;
        this.aggRepo = aggRepo;
    }

    @Transactional
    public UserTargetReview saveReview(ReviewDTO dto) {
        UserTargetReview review = new UserTargetReview();

        UserTargetReviewId userTargetReviewId = new UserTargetReviewId();
        userTargetReviewId.setTargetId(dto.getTargetId());
        userTargetReviewId.setUserId(dto.getUserId());
        userTargetReviewId.setTargetType(dto.getTargetType());

        review.setId(userTargetReviewId);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(OffsetDateTime.now());

        UserTargetReview saved = repo.save(review);

        updateAggregate(dto.getTargetType(), dto.getTargetId());

        return saved;
    }


    public List<UserTargetReview> getReviews(String type, Long targetId) {
        return repo.findByTargetTypeAndTargetId(type, targetId);
    }


    public List<UserTargetReview> getUserReviews(Long userId) {
        return repo.findByUserId(userId);
    }

    // 🔷 DELETE
    @Transactional
    public void deleteReview(Long userId, String type, Long targetId) {

        UserTargetReviewId id =
                new UserTargetReviewId(userId, type, targetId);

        repo.deleteById(id);

        updateAggregate(type, targetId);
    }

    // 🔷 AGGREGATION LOGIC
    private void updateAggregate(String type, Long targetId) {

        List<UserTargetReview> reviews =
                repo.findByTargetTypeAndTargetId(type, targetId);

        double avg = reviews.stream()
                .mapToInt(UserTargetReview::getRating)
                .average()
                .orElse(0);

        int count = reviews.size();

        switch (type.toLowerCase()) {
            case "hotel":
                aggRepo.upsertHotel(targetId, avg, count);
                break;
            case "guide":
                aggRepo.upsertGuide(targetId, avg, count);
                break;
            case "driver":
                aggRepo.upsertDriver(targetId, avg, count);
                break;
        }
    }
}