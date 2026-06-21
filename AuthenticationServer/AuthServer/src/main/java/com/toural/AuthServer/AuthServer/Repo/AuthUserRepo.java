package com.toural.AuthServer.AuthServer.Repo;


import com.toural.AuthServer.AuthServer.Entity.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthUserRepo extends JpaRepository<AuthUser,Long> {
     Optional<AuthUser> findByUsername(String u);
}
