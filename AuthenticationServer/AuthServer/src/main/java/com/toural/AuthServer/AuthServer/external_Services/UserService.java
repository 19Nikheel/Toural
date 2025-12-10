package com.toural.AuthServer.AuthServer.external_Services;


import com.toural.AuthServer.AuthServer.DTO.SignupPacket;
import com.toural.AuthServer.AuthServer.DTO.postSign;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="USERSERVICE")
public interface UserService {

    @PostMapping(value="/user/add" , consumes = "application/json")
    ResponseEntity<Boolean> sendItem(@RequestBody postSign sp);

    @GetMapping("/user/getid/{email}")
    ResponseEntity<String> getId(@PathVariable("email") String email);

}
