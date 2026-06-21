package com.Toural.rating.RatingService.Controller;


import com.Toural.rating.RatingService.Models.UserTargetReview;
import com.Toural.rating.RatingService.dtos.ReviewDTO;
import com.Toural.rating.RatingService.services.UserTargetReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
public class RatingController {
    @Autowired
    private UserTargetReviewService service;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ReviewDTO dto) {

        UserTargetReview saved = service.saveReview(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    @GetMapping
    public ResponseEntity<?> getReviews(
            @RequestParam String type,
            @RequestParam Long targetId) {

        List<UserTargetReview> reviews =
                service.getReviews(type, targetId);

        if (reviews.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No reviews found");
        }

        return ResponseEntity.ok(reviews);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserReviews(@PathVariable Long userId) {

        List<UserTargetReview> reviews =
                service.getUserReviews(userId);

        if (reviews.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No reviews found for user");
        }
        return ResponseEntity.ok(reviews);
    }


    @DeleteMapping
    public ResponseEntity<?> deleteReview(
            @RequestParam Long userId,
            @RequestParam String type,
            @RequestParam Long targetId) {
        service.deleteReview(userId, type, targetId);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
