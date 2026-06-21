package com.Toural.UserService.Service;

import com.Toural.UserService.DTO.SignupPacket;
import com.Toural.UserService.Models.BaseUser;
import com.Toural.UserService.Repo.BaseUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BaseUserService {
    @Autowired
    private BaseUserRepository baseUserRepository;

    public Boolean saveBaseUser(SignupPacket signupPacket) {
        BaseUser b1 = new BaseUser();
        b1.setUserId(Long.valueOf(signupPacket.getUserId()));
        b1.setName(signupPacket.getName());
        b1.setEmail(signupPacket.getEmail());
        b1.setPhoneNo(signupPacket.getPhoneNo());
        b1.setType(signupPacket.getType());
        BaseUser save = baseUserRepository.save(b1);
        if (save != null) {
            return true;
        }
        return false;
    }

    public Boolean existsById(Long id) {
        return baseUserRepository.existsById(id);
    }

    public Optional<BaseUser> findById(Long l) {
        return baseUserRepository.findById(l);
    }

    public BaseUser findByEmail(String email) {
        return baseUserRepository.findByEmail(email);
    }
}
