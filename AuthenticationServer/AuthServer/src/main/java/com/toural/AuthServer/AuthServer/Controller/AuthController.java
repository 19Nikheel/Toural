package com.toural.AuthServer.AuthServer.Controller;


import com.toural.AuthServer.AuthServer.Config.CustomUserDetailService;
import com.toural.AuthServer.AuthServer.DTO.JwtResponce;
import com.toural.AuthServer.AuthServer.DTO.Request;
import com.toural.AuthServer.AuthServer.DTO.SignupPacket;
import com.toural.AuthServer.AuthServer.Service.AuthService;
import com.toural.AuthServer.AuthServer.Service.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private CustomUserDetailService userDetailsService;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Request jwtRequest) {
        System.out.println(jwtRequest.getUsername() +  " " + jwtRequest.getPassword());
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            System.out.println(jwtRequest.getRole()+" "+ authenticate.getName());
            String token = this.jwtHelper.generateToken(jwtRequest.getRole(), authenticate.getName());
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>("Username or Password is wrong", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> loadData(@RequestBody SignupPacket user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("wrong sign up credentials");
        }
        try {
            Boolean result = authService.saveUser(user);
            if (result) {
                return ResponseEntity.ok().body("Registered Successfully");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> exceptionHandler(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credentials Invalid !!");
    }
}
