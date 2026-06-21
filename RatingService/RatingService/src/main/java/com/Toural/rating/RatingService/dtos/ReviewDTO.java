package com.Toural.rating.RatingService.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private Long userId;
    private String targetType; // hotel / guide / driver
    private Long targetId;
    private Short rating;
    private String comment;
}