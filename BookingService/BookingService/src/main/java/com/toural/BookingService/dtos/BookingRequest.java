package com.toural.BookingService.dtos;

import com.toural.BookingService.entities.ItemType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {
    private String userId;
    private ItemType itemType;
    private String itemId;
    private int duration;
}
