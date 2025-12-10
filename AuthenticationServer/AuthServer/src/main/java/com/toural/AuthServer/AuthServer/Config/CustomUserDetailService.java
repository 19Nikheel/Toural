package com.toural.AuthServer.AuthServer.Config;


import com.toural.AuthServer.AuthServer.Entity.AuthUser;
import com.toural.AuthServer.AuthServer.Repo.AuthUserRepo;
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
    private AuthUserRepo authUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println();
        System.out.println(username);
        System.out.println();
        Optional<AuthUser> byUsername = authUserRepo.findByUsername(username);



        if(byUsername.isEmpty()){
            throw new UsernameNotFoundException("user not found");
        }

        return User.withUsername(byUsername.get().getUsername())
                .password(byUsername.get().getPassword())
                .roles(byUsername.get().getRole())
                .build();
        
    }

}

