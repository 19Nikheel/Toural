package com.Toural.rating.RatingService.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rating")
public class RatingController {


    @GetMapping("/")
    public String we(){
        return "rating";
    }
}
