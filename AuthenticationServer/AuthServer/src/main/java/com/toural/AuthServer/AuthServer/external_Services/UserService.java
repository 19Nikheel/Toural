package com.toural.AuthServer.AuthServer.external_Services;


import com.toural.AuthServer.AuthServer.DTO.PostSign;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name="USERSERVICE")
public interface UserService {

    @PostMapping(value="/user/add-user" , consumes = "application/json")
    ResponseEntity<Boolean> sendItem(@RequestHeader("Authorization") String jwtToken, @RequestBody PostSign sp);

    @GetMapping("/user/getid/{email}")
    ResponseEntity<String> getId(@PathVariable("email") String email);
}
