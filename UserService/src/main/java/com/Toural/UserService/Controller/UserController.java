package com.Toural.UserService.Controller;


import com.Toural.UserService.DTO.*;
import com.Toural.UserService.Models.*;
import com.Toural.UserService.Repo.*;
import com.Toural.UserService.Util.EmailBucket;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private BaseUserRepository baseUserRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private HotelManagerRepository hotelManagerRepository;

    @Autowired
    private TouristGuideRepository touristGuideRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;


    @PostMapping("/add")
    public ResponseEntity<Boolean> addPost(@RequestBody SignupPacket signupPacket){
        try {
            BaseUser b1 = new BaseUser();
            b1.setName(signupPacket.getName());
            b1.setEmail(signupPacket.getEmail());
            b1.setPhoneNo(signupPacket.getPhoneNo());
            b1.setType(signupPacket.getType());
            BaseUser save = baseUserRepository.save(b1);

            return  ResponseEntity.ok().body(true);
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body(false);
        }

    }


    @GetMapping("/authid/{id}")
    public ResponseEntity<Boolean> checkId (@PathVariable("id") long id){

        boolean b = baseUserRepository.existsById(id);

        return ResponseEntity.ok().body(b);
    }

    @GetMapping("/getid/{email}")
    public ResponseEntity<String> getId (@PathVariable("email") String email ){
        BaseUser bu= baseUserRepository.findByEmail(email);

        return ResponseEntity.ok().body(bu.getUserId().toString());
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile (){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<BaseUser> byId = baseUserRepository.findById((Long) principal);
        String type=byId.get().getType();



        if(type.toLowerCase().equals("user")){

            UserProfile userProfile = userProfileRepository.findById(new UserProfileId(EmailBucket
                    .bucketFor(byId.get().getEmail(), 16), byId.get().getUserId())).get();


            profileDto profileDto = new profileDto();
            profileDto.setAddress(userProfile.getAddress());
            profileDto.setDob(userProfile.getDob().toString());
            profileDto.setEmail(byId.get().getEmail());
            profileDto.setName(byId.get().getName());
            profileDto.setPhoneNo(byId.get().getPhoneNo());
            profileDto.setType(byId.get().getType());
            profileDto.setPic(userProfile.getProfilePicture());

            return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(profileDto);

        } else if (type.toLowerCase().equals("hotel")) {
            HotelManager userProfile = hotelManagerRepository.findById(new UserProfileId(EmailBucket
                    .bucketFor(byId.get().getEmail(), 16), byId.get().getUserId())).get();

            HotelManagerProfile hmp=new HotelManagerProfile();
            hmp.setEmail(byId.get().getEmail());
            hmp.setType(byId.get().getType());
            hmp.setPhoneNo(byId.get().getPhoneNo());
            hmp.setPhoneOffice(userProfile.getPhoneOffice());
            hmp.setManagedHotelId(userProfile.getManagedHotelId());

            return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(hmp);


        }else if (type.toLowerCase().equals("tourist")){
            TouristGuide userProfile = touristGuideRepository.findById(new UserProfileId(EmailBucket
                    .bucketFor(byId.get().getEmail(), 16), byId.get().getUserId())).get();


            TouristProfile tp=new TouristProfile();
            tp.setEmail(byId.get().getEmail());
            tp.setType(byId.get().getType());
            tp.setPhoneNo(byId.get().getPhoneNo());
            tp.setBio(userProfile.getBio());
            tp.setCertifications(userProfile.getCertifications());
            tp.setLocation(userProfile.getLocation());
            tp.setRatingAvg(userProfile.getRatingAvg());
            tp.setAvailabilityJson(userProfile.getAvailabilityJson());
            tp.setRatingCount(userProfile.getRatingCount());
            tp.setHourlyRate(userProfile.getHourlyRate());
            tp.setLanguagesJson(userProfile.getLanguagesJson());

            return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(tp);

        }else if (type.toLowerCase().equals("driver")){
            Driver userProfile = driverRepository.findById(new UserProfileId(EmailBucket
                    .bucketFor(byId.get().getEmail(), 16), byId.get().getUserId())).get();


            DriverProfile dp=new DriverProfile(byId.get().getName(),byId.get()
                    .getEmail(),byId.get().getPhoneNo(),byId.get().getType(),
                    userProfile.getLicenseNumber(), userProfile.getVehicleType(), userProfile.getVehicleModel(),
                    userProfile.getVehicleNumber(), userProfile.getExperienceYears(), userProfile.getRatingAvg(),
                    userProfile.getRatingCount());

            return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(dp);

        }

        return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body("NOT Found");
    }
}
