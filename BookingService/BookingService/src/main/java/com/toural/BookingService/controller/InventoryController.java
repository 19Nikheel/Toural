package com.toural.BookingService.controller;

import com.toural.BookingService.entities.Inventory;
import com.toural.BookingService.entities.ItemType;
import com.toural.BookingService.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PutMapping("/toggle-status")
    public ResponseEntity<Inventory> toggleAvailability(
            @RequestParam ItemType itemType,
            @RequestParam String itemId,
            @RequestParam boolean isAvailable) {
        
        Inventory updatedInventory = inventoryService.toggleAvailability(itemType, itemId, isAvailable);
        return ResponseEntity.ok(updatedInventory);
    }
}
