package com.toural.AuthServer.AuthServer.Service;

import com.toural.AuthServer.AuthServer.DTO.PostSign;
import com.toural.AuthServer.AuthServer.DTO.SignupPacket;
import com.toural.AuthServer.AuthServer.Entity.AuthUser;
import com.toural.AuthServer.AuthServer.Repo.AuthUserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private AuthUserRepo authUserRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SendService sendService;

    @Autowired
    private JwtHelper jwtHelper;

    @Transactional
    public Boolean saveUser(SignupPacket user){
        AuthUser uload=new AuthUser();
        uload.setUsername(user.getEmail());
        uload.setRole(user.getType().toUpperCase());
        uload.setPassword(passwordEncoder.encode(user.getPassword()));
        AuthUser save = authUserRepo.save(uload);
        String token = jwtHelper.generateToken(save.getRole(), save.getUserId().toString());
        String finalToken = "Bearer "+token;
        if (save != null) {
            PostSign ps=new PostSign(save.getUserId(), user.getName(), user.getEmail(), user.getPhoneNo(), save.getRole());
            boolean result = sendService.sendToB(finalToken, ps);
            if (result) {
                return true;
            }
        }
        return false;
    }
}
