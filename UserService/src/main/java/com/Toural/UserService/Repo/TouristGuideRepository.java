package com.Toural.UserService.Repo;

import com.Toural.UserService.Models.TouristGuide;
import com.Toural.UserService.Models.UserProfileId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TouristGuideRepository extends JpaRepository<TouristGuide, UserProfileId> {
}
