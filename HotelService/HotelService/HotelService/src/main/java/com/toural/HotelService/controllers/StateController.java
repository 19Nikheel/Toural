package com.toural.HotelService.controllers;

import com.toural.HotelService.entities.State;
import com.toural.HotelService.repos.StateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("state")
public class StateController {
    @Autowired
    private StateRepo stateRepo;
    @GetMapping("/state-code/{stateCode}")
    public ResponseEntity<State> findState(@PathVariable  String stateCode){
        State state = stateRepo.findByStateCode(stateCode).get();
        if(state != null){
            return ResponseEntity.ok(state);
        }
        return ResponseEntity.notFound().build();
    }
}
