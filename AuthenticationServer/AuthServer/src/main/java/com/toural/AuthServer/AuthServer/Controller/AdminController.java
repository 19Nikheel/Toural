package com.toural.AuthServer.AuthServer.Controller;

import com.toural.AuthServer.AuthServer.DTO.SignupPacket;
import com.toural.AuthServer.AuthServer.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AuthService authService;

    @PostMapping("/add-car-manager")
    public ResponseEntity<?> addCarManager(@RequestBody SignupPacket user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // Check if the current user has the ADMIN role
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can create car managers");
        }

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signup credentials");
        }
        
        // Force type to driver (which is the car manager role in UserService)
        user.setType("driver");

        try {
            Boolean result = authService.saveAdminUser(user);
            if (result) {
                return ResponseEntity.ok().body("Car Manager Registered Successfully");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
