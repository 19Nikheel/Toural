package com.Toural.UserService.Repo;

import com.Toural.UserService.Models.BaseUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BaseUserRepository extends JpaRepository<BaseUser, Long> {
    BaseUser findByEmail(String email);
    // this will generate SQL with where email_bucket = ? AND email_norm = ?
    //Optional<BaseUser> findByEmailBucketAndEmailNorm(Integer emailBucket, String emailNorm);
}

