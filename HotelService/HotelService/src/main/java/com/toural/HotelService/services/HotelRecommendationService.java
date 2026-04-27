package com.toural.HotelService.services;

import com.toural.HotelService.dtos.HotelNameRecDto;
import com.toural.HotelService.dtos.HotelRecommendationDto;
import com.toural.HotelService.entities.Hotel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelRecommendationService {
    @Autowired
    private HotelService hotelService;
    private final WebClient webClient;
    private List<HotelRecommendationDto> callApi(String path, HotelNameRecDto dto) {
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path(path)
                            .queryParam("hotel_name", dto.getHotelName())
                            .queryParam("top_n", dto.getTopN())
                            .build())
                    .retrieve()
                    .bodyToFlux(HotelRecommendationDto.class)
                    .collectList()
                    .block();
        } catch (Exception e) {
            System.out.println("Failed to call recommendation API" + e.getMessage());
            return null;
        }
    }

    public List<Hotel> findByHotelNameAndTopN(HotelNameRecDto hotelNameRecDto) {
        List<HotelRecommendationDto> hotelRecommendationDtos = callApi("/recommend", hotelNameRecDto);
        if (hotelRecommendationDtos == null) {
            return null;
        }
        List<Hotel> hotels = new ArrayList<>();
        for (var i : hotelRecommendationDtos) {
            Hotel byHotelId = hotelService.findByHotelId(i.getHotelId());
            if (byHotelId != null) {
                hotels.add(byHotelId);
            }
        }
        return hotels;
    }
}
