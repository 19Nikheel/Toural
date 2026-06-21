package com.toural.HotelService.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelRecommendationDto {
    @JsonProperty("uniq_id")
    private String hotelId;
    @JsonProperty("property_name")
    private String hotelName;
    @JsonProperty("city")
    private String cityName;
}
