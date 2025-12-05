package com.Toural.UserService.Repo;


import com.Toural.UserService.Models.HotelManager;
import com.Toural.UserService.Models.UserProfileId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelManagerRepository extends JpaRepository<HotelManager, UserProfileId> {
}
