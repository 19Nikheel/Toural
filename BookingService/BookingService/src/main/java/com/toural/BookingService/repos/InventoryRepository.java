package com.toural.BookingService.repos;

import com.toural.BookingService.entities.Inventory;
import com.toural.BookingService.entities.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByItemTypeAndItemId(ItemType itemType, String itemId);
}
