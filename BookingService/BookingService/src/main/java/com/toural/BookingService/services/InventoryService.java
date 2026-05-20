package com.toural.BookingService.services;

import com.toural.BookingService.entities.Inventory;
import com.toural.BookingService.entities.ItemType;
import com.toural.BookingService.repos.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Transactional
    public Inventory toggleAvailability(ItemType itemType, String itemId, boolean isAvailable) {
        Inventory inventory = inventoryRepository.findByItemTypeAndItemId(itemType, itemId)
                .orElseThrow(() -> new RuntimeException("Inventory not found for " + itemType + " with id " + itemId));
        
        inventory.setAvailable(isAvailable);
        return inventoryRepository.save(inventory);
    }
}
