package com.Toural.UserService.Controller;


import com.Toural.UserService.DTO.*;
import com.Toural.UserService.Models.*;
import com.Toural.UserService.Repo.*;
import com.Toural.UserService.Service.BaseUserService;
import com.Toural.UserService.Util.EmailBucket;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private BaseUserService baseUserService;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private HotelManagerRepository hotelManagerRepository;

    @Autowired
    private TouristGuideRepository touristGuideRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;


    @PostMapping("/add-user")
    public ResponseEntity<Boolean> addPost(@RequestBody SignupPacket signupPacket){
        try {
            if (signupPacket!=null){
                Boolean b = baseUserService.saveBaseUser(signupPacket);
                return  ResponseEntity.ok().body(b);
            }
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body(false);
        }
        return  ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body(false);
    }


    @GetMapping("/authid/{id}")
    public ResponseEntity<Boolean> checkId (@PathVariable("id") long id){
        boolean b = baseUserService.existsById(id);
        return ResponseEntity.ok().body(b);
    }

    @GetMapping("/getid/{email}")
    public ResponseEntity<String> getId (@PathVariable("email") String email ){
        BaseUser bu= baseUserService.findByEmail(email);
        return ResponseEntity.ok().body(bu.getUserId().toString());
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile (){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        Optional<BaseUser> byId = baseUserService.findById(Long.parseLong(username));
        String type=byId.get().getType();
        // testing user fetched
        BaseUser user = byId.get();
        if(type.equalsIgnoreCase("user") || type.equalsIgnoreCase("customer")){
            try{
                UserProfile userProfile = userProfileRepository.findById(new UserProfileId(EmailBucket
                        .bucketFor(byId.get().getEmail(), 16), byId.get().getUserId())).get();

                ProfileDto profileDto = new ProfileDto();
                profileDto.setUserId(String.valueOf(user.getUserId()));
                profileDto.setAddress(userProfile.getAddress());
                profileDto.setDob(userProfile.getDob().toString());
                profileDto.setEmail(byId.get().getEmail());
                profileDto.setName(byId.get().getName());
                profileDto.setPhoneNo(byId.get().getPhoneNo());
                profileDto.setType(byId.get().getType());
                profileDto.setPic(userProfile.getProfilePicture());

                return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(profileDto);
            }catch (Exception w){
                ProfileDto profileDto = new ProfileDto();
                profileDto.setUserId(String.valueOf(user.getUserId()));
                profileDto.setAddress("NA");
                profileDto.setDob("NA");
                profileDto.setEmail(byId.get().getEmail());
                profileDto.setName(byId.get().getName());
                profileDto.setPhoneNo(byId.get().getPhoneNo());
                profileDto.setType(byId.get().getType());
                profileDto.setPic("NA");

                return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(profileDto);
            }
        } else if (type.toLowerCase().equals("hotel")) {
            try {
                HotelManager userProfile = hotelManagerRepository.findById(new UserProfileId(EmailBucket
                        .bucketFor(byId.get().getEmail(), 16), byId.get().getUserId())).get();

                HotelManagerProfile hmp=new HotelManagerProfile();
                hmp.setEmail(byId.get().getEmail());
                hmp.setType(byId.get().getType());
                hmp.setPhoneNo(byId.get().getPhoneNo());
                hmp.setPhoneOffice(userProfile.getPhoneOffice());
                hmp.setManagedHotelId(userProfile.getManagedHotelId());

                return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(hmp);
            }catch (Exception e){
                HotelManagerProfile hmp=new HotelManagerProfile();
                hmp.setEmail(byId.get().getEmail());
                hmp.setType(byId.get().getType());
                hmp.setPhoneNo(byId.get().getPhoneNo());
                hmp.setPhoneOffice("NA");
                hmp.setManagedHotelId("NA");

                return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(hmp);
            }




        }else if (type.toLowerCase().equals("tourist")){
            try {
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
            }catch (Exception e){
                TouristProfile tp=new TouristProfile();
                tp.setEmail(byId.get().getEmail());
                tp.setType(byId.get().getType());
                tp.setPhoneNo(byId.get().getPhoneNo());
                tp.setBio("NA");
                tp.setCertifications(null);
                tp.setLocation("NA");
                tp.setRatingAvg(BigDecimal.valueOf(0.0));
                tp.setAvailabilityJson("NA");
                tp.setRatingCount(0);
                tp.setHourlyRate(BigDecimal.valueOf(0.0));
                tp.setLanguagesJson("NA");



                return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(tp);

            }



        }else if (type.toLowerCase().equals("driver")){

            try{
                Driver userProfile = driverRepository.findById(new UserProfileId(EmailBucket
                        .bucketFor(byId.get().getEmail(), 16), byId.get().getUserId())).get();
                DriverProfile dp=new DriverProfile();
                dp.setName(byId.get().getName());
                dp.setEmail(byId.get().getEmail());
                dp.setType(byId.get().getType());
                dp.setPhoneNo(byId.get().getPhoneNo());
                dp.setRatingAvg(BigDecimal.valueOf(0));
                dp.setExperienceYears(0);
                dp.setLicenseNumber(userProfile.getLicenseNumber());
                dp.setRatingCount(0);
                dp.setVehicleModel(userProfile.getVehicleModel());
                dp.setVehicleNumber(userProfile.getVehicleNumber());
                dp.setVehicleType(userProfile.getVehicleType());


                return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(dp);

            }catch (Exception e){
                DriverProfile dp=new DriverProfile();
                dp.setName(byId.get().getName());
                dp.setEmail(byId.get().getEmail());
                dp.setType(byId.get().getType());
                dp.setPhoneNo(byId.get().getPhoneNo());
                dp.setRatingAvg(BigDecimal.valueOf(0));
                dp.setExperienceYears(0);
                dp.setLicenseNumber("NA");
                dp.setRatingCount(0);
                dp.setVehicleModel("NA");
                dp.setVehicleNumber("NA");
                dp.setVehicleType("NA");
                return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body(dp);

            }
        }
        return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body("NOT Found");
    }

    @PutMapping("/hotel-manager/update")
    public ResponseEntity<?> updateHotelManager(@RequestBody java.util.Map<String, String> payload) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<BaseUser> byId = baseUserService.findById(Long.parseLong(username));
        if (byId.isEmpty() || !byId.get().getType().equalsIgnoreCase("hotel")) {
            return ResponseEntity.status(HttpStatus.SC_FORBIDDEN).body("Not a hotel manager");
        }
        BaseUser user = byId.get();
        UserProfileId upId = new UserProfileId(EmailBucket.bucketFor(user.getEmail(), 16), user.getUserId());
        HotelManager hm = hotelManagerRepository.findById(upId).orElse(new HotelManager(upId));
        
        if (hm.getOfficeAddress() == null) hm.setOfficeAddress("NA");
        if (hm.getPhoneOffice() == null) hm.setPhoneOffice("NA");

        if (payload.containsKey("managedHotelId")) {
            hm.setManagedHotelId(payload.get("managedHotelId"));
        }
        if (payload.containsKey("phoneOffice")) {
            hm.setPhoneOffice(payload.get("phoneOffice"));
        }
        if (payload.containsKey("officeAddress")) {
            hm.setOfficeAddress(payload.get("officeAddress"));
        }
        hotelManagerRepository.save(hm);
        return ResponseEntity.ok("Hotel Manager profile updated successfully");
    }

    @PutMapping("/tourist-guide/update")
    public ResponseEntity<?> updateTouristGuide(@RequestBody java.util.Map<String, String> payload) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<BaseUser> byId = baseUserService.findById(Long.parseLong(username));
        if (byId.isEmpty() || !byId.get().getType().equalsIgnoreCase("tourist")) {
            return ResponseEntity.status(HttpStatus.SC_FORBIDDEN).body("Not a tourist guide");
        }
        BaseUser user = byId.get();
        UserProfileId upId = new UserProfileId(EmailBucket.bucketFor(user.getEmail(), 16), user.getUserId());
        TouristGuide tg = touristGuideRepository.findById(upId).orElse(new TouristGuide(upId));

        if (tg.getLocation() == null) tg.setLocation("NA");
        if (tg.getAvailabilityJson() == null) tg.setAvailabilityJson("[]");
        if (tg.getBio() == null) tg.setBio("NA");
        if (tg.getHourlyRate() == null) tg.setHourlyRate(java.math.BigDecimal.ZERO);

        if (payload.containsKey("location")) {
            tg.setLocation(payload.get("location"));
        }
        if (payload.containsKey("availabilityJson")) {
            tg.setAvailabilityJson(payload.get("availabilityJson"));
        }
        if (payload.containsKey("bio")) {
            tg.setBio(payload.get("bio"));
        }
        if (payload.containsKey("languagesJson")) {
            tg.setLanguagesJson(payload.get("languagesJson"));
        }
        touristGuideRepository.save(tg);
        return ResponseEntity.ok("Tourist Guide profile updated successfully");
    }

    @PutMapping("/driver/update")
    public ResponseEntity<?> updateDriver(@RequestBody java.util.Map<String, String> payload) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<BaseUser> byId = baseUserService.findById(Long.parseLong(username));
        if (byId.isEmpty() || !byId.get().getType().equalsIgnoreCase("driver")) {
            return ResponseEntity.status(HttpStatus.SC_FORBIDDEN).body("Not a driver");
        }
        BaseUser user = byId.get();
        UserProfileId upId = new UserProfileId(EmailBucket.bucketFor(user.getEmail(), 16), user.getUserId());
        Driver driver = driverRepository.findById(upId).orElseGet(() -> {
            Driver d = new Driver();
            d.setId(upId);
            return d;
        });

        if (driver.getLicenseNumber() == null) driver.setLicenseNumber("NA");
        if (driver.getVehicleType() == null) driver.setVehicleType("NA");
        if (driver.getVehicleModel() == null) driver.setVehicleModel("NA");
        if (driver.getVehicleNumber() == null) driver.setVehicleNumber("NA");
        if (driver.getExperienceYears() == null) driver.setExperienceYears(0);

        if (payload.containsKey("licenseNumber")) driver.setLicenseNumber(payload.get("licenseNumber"));
        if (payload.containsKey("vehicleType")) driver.setVehicleType(payload.get("vehicleType"));
        if (payload.containsKey("vehicleModel")) driver.setVehicleModel(payload.get("vehicleModel"));
        if (payload.containsKey("vehicleNumber")) driver.setVehicleNumber(payload.get("vehicleNumber"));
        if (payload.containsKey("experienceYears")) driver.setExperienceYears(Integer.parseInt(payload.get("experienceYears")));

        driverRepository.save(driver);
        return ResponseEntity.ok("Driver profile updated successfully");
    }
}
