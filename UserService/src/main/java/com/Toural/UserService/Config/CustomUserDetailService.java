package com.Toural.UserService.Config;


import com.Toural.UserService.Models.BaseUser;
import com.Toural.UserService.Repo.BaseUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUserDetailService implements UserDetailsService {
    @Autowired @Lazy
    private PasswordEncoder pse;

    @Autowired
    private BaseUserRepository authUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<BaseUser> byUsername = authUserRepo.findById(Long.parseLong(username));

        if(byUsername.isEmpty()){
            throw new UsernameNotFoundException("user not found");
        }

        return User.withUsername(byUsername.get().getUserId().toString())
                .roles(byUsername.get().getType())
                .build();
        
    }

}

