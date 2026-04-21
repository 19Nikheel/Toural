package com.toural.HotelService.services;

import com.toural.HotelService.entities.City;
import com.toural.HotelService.entities.Hotel;
import com.toural.HotelService.entities.Tour;
import com.toural.HotelService.repos.HotelRepo;
import com.toural.HotelService.repos.TourRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TourService {
    @Autowired
    private TourRepo tourRepo;

    @Autowired
    private HotelRepo hotelRepo;

    public List<Tour> findAll() {
        return tourRepo.findAll();
    }

    public Tour addTour(Tour tour) {
        return tourRepo.save(tour);
    }

//    public Tour updateTour(Tour tour) {
//        Tour existingTour = tourRepo.findById(tour.getId())
//                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + tour.getId()));
//        if (tour.getName() != null) existingTour.setName(tour.getName());
//        if (tour.getDescription() != null) existingTour.setDescription(tour.getDescription());
//        if (tour.getPrice() != null) existingTour.setPrice(tour.getPrice());
//        if (tour.getImage() != null) existingTour.setImage(tour.getImage());
//        if (tour.getCityName() != null) existingTour.setCityName(tour.getCityName());
//        if (tour.getCityCode() != null) existingTour.setCityCode(tour.getCityCode());
//        if (tour.getTags() != null) existingTour.setTags(tour.getTags());
//        if (tour.getBestSeason() != null) existingTour.setBestSeason(tour.getBestSeason());
//        if (tour.getHighlights() != null) existingTour.setHighlights(tour.getHighlights());
//        if (tour.getHotels() != null) existingTour.setHotels(tour.getHotels());
//        return tourRepo.save(existingTour);
//    }

    public void deleteTour(Tour tour) {

    }

    public Tour updateTour(ObjectId id) {
//        Tour tour = tourRepo.findById(id).get();
//        ArrayList<Hotel> hotels = tour.getHotels();
//        List<Hotel> byCityCode = hotelRepo.findByCityCode("2711");
//        hotels.addAll(byCityCode);
//        tour.setHotels(hotels);
//        return tourRepo.save(tour);
        return null;
    }

    public List<Tour> findByCityCode(String city) {
        return tourRepo.findByCity(city);
    }

    public Tour findById(ObjectId id) {
        return tourRepo.findById(id).get();
    }

    public List<Tour> findByCityContainingIgnoreCase(String let) {
        return tourRepo.findByCityContainingIgnoreCase(let);
    }
}