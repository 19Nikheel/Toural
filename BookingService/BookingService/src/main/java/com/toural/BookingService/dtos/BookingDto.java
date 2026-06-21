package com.toural.BookingService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private String hotelId;
    private String userId;
    private String amount;
}
