package com.toural.HotelService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelNameRecDto {
    private String hotelName;
    private Integer topN;
    private String cityName;
}
