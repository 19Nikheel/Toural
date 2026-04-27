package com.toural.HotelService.services;

import com.toural.HotelService.config.ResourceNotFoundException;
import com.toural.HotelService.entities.Hotel;
import com.toural.HotelService.repos.HotelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {
    @Autowired
    private HotelRepo hotelRepo;

    public List<Hotel> findAll() {
        return hotelRepo.findAll();
    }

    public Hotel addNewHotel(Hotel hotel) {
        return hotelRepo.save(hotel);
    }

    public List<Hotel> findByCityCode(String cityCode) {
        return hotelRepo.findByCityCode(cityCode);
    }
    public Hotel updateHotel(String hotelId, Hotel updated) {
        Hotel existing =  hotelRepo.findByHotelId(hotelId).get();
        existing.setHotelName(updated.getHotelName());
        existing.setDescription(updated.getDescription());
        existing.setStateName(updated.getStateName());
        existing.setCityName(updated.getCityName());
        existing.setAddressLine(updated.getAddressLine());
        existing.setSingleRoom(updated.getSingleRoom());
        existing.setDoubleRoom(updated.getDoubleRoom());
        existing.setSuite(updated.getSuite());
        existing.setFamilyRoom(updated.getFamilyRoom());
        existing.setHasPool(updated.getHasPool());
        existing.setRating(updated.getRating());
        existing.setCityCode(updated.getCityCode());
        existing.setImages(updated.getImages());
        existing.setPolicies(updated.getPolicies());

        return hotelRepo.save(existing);
    }

    public Hotel findByHotelId(String hotelId) {
        Hotel byHotelId = null;
        try {
            byHotelId = hotelRepo.findByHotelId(hotelId).get();
            if (byHotelId != null) return byHotelId;
        } catch (Exception e) {
            System.out.println("hotelId not found");
        }
        return null;
    }

    public List<Hotel> findByCityName(String cityName) {
        return hotelRepo.findByCityNameContainingIgnoreCase(cityName);
    }
}
