package com.toural.BookingService.services;

import com.toural.BookingService.repos.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {
    @Autowired
    private BookingRepo bookingRepo;


}
