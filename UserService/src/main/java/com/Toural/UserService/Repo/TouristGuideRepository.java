package com.Toural.UserService.Repo;

import com.Toural.UserService.Models.TouristGuide;
import com.Toural.UserService.Models.UserProfileId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TouristGuideRepository extends JpaRepository<TouristGuide, UserProfileId> {
    Optional<TouristGuide> findByIdUserId(Long userId);
}
