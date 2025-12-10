package com.toural.HotelService.services;

import com.toural.HotelService.config.ResourceNotFoundException;
import com.toural.HotelService.entities.Hotel;
import com.toural.HotelService.repos.HotelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        existing.setGovHotelId(updated.getGovHotelId());
        existing.setHotelName(updated.getHotelName());
        existing.setDescription(updated.getDescription());
        existing.setStateName(updated.getStateName());
        existing.setCityName(updated.getCityName());
        existing.setAddressLine(updated.getAddressLine());
        existing.setZipcode(updated.getZipcode());
        existing.setPlusCode(updated.getPlusCode());
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
}
