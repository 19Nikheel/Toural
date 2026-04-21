package com.toural.AuthServer.AuthServer.Controller;


import com.toural.AuthServer.AuthServer.Config.CustomUserDetailService;
import com.toural.AuthServer.AuthServer.DTO.JwtResponce;
import com.toural.AuthServer.AuthServer.DTO.Request;
import com.toural.AuthServer.AuthServer.DTO.SignupPacket;
import com.toural.AuthServer.AuthServer.DTO.postSign;
import com.toural.AuthServer.AuthServer.Entity.AuthUser;
import com.toural.AuthServer.AuthServer.Repo.AuthUserRepo;
import com.toural.AuthServer.AuthServer.Service.JwtHelper;
import com.toural.AuthServer.AuthServer.Service.SendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private CustomUserDetailService userDetailsService;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private AuthUserRepo authUserRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SendService sendService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Request jwtRequest) {
        System.out.println(jwtRequest);
        System.out.println(jwtRequest.getUsername()+"66");

        this.doAuthenticate(jwtRequest.getUsername(),jwtRequest.getPassword());

        UserDetails userDetails=userDetailsService.loadUserByUsername(jwtRequest.getUsername());


        String str = sendService.receiveFromB(jwtRequest.getUsername());
        String token=this.jwtHelper.generateToken(userDetails,str);

        System.out.println(token+"56");

        JwtResponce responce= new JwtResponce();
        responce.setJwttoken(token);
        responce.setUsername(jwtRequest.getUsername());
        responce.setRole(jwtRequest.getRole());
        return new ResponseEntity<>(responce, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> loadData(@RequestBody SignupPacket user){

        if(user==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("wrong sign up credentials");
        }

        AuthUser uload=new AuthUser();
        uload.setUsername(user.getEmail());
        uload.setRole(user.getType());
        uload.setPassword(passwordEncoder.encode(user.getPassword()));
        authUserRepo.save(uload);

        try{

            postSign ps=new postSign(user.getName(), user.getEmail(), user.getPhoneNo(), user.getType());
            boolean result = sendService.sendToB(ps);

            if(result){
                return ResponseEntity.ok().body("Registered Successfully");
            }else{
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }



    private void doAuthenticate(String username,String password){
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(username,password);
        try {

            authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        }catch(BadCredentialsException e){
            throw new BadCredentialsException("Invalid username and password");
        }

    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> exceptionHandler(BadCredentialsException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credentials Invalid !!");
    }
}
