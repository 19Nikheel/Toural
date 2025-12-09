package com.toural.HotelService.services;

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
}
