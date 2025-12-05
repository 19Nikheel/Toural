package com.Toural.UserService.Repo;

import com.Toural.UserService.Models.UserProfile;
import com.Toural.UserService.Models.UserProfileId;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserProfileRepository extends JpaRepository<UserProfile, UserProfileId>{
}
