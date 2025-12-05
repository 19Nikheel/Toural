package com.Toural.UserService.Repo;

import com.Toural.UserService.Models.Driver;
import com.Toural.UserService.Models.UserProfileId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, UserProfileId> {
}
