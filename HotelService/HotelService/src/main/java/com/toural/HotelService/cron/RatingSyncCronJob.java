package com.toural.HotelService.cron;

import com.toural.HotelService.entities.Hotel;
import com.toural.HotelService.repos.HotelRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class RatingSyncCronJob {

    private static final Logger log = LoggerFactory.getLogger(RatingSyncCronJob.class);

    @Autowired
    private HotelRepo hotelRepo;

    private final RestTemplate restTemplate = new RestTemplate();

    // Run every midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void syncHotelRatings() {
        log.info("Starting midnight sync of hotel ratings from RatingService...");
        try {
            // Fetch aggregates via APIGateway
            String url = "http://localhost:8084/rating/aggregates/hotel";
            ResponseEntity<Map<Long, Map<String, Number>>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<Long, Map<String, Number>>>() {}
            );

            Map<Long, Map<String, Number>> aggregates = response.getBody();
            if (aggregates != null && !aggregates.isEmpty()) {
                for (Map.Entry<Long, Map<String, Number>> entry : aggregates.entrySet()) {
                    Long hotelId = entry.getKey();
                    Double rating = entry.getValue().get("rating").doubleValue();

                    // Find hotel and update rating
                    hotelRepo.findByHotelId(String.valueOf(hotelId)).ifPresent(hotel -> {
                        hotel.setRating(rating);
                        hotelRepo.save(hotel);
                    });
                }
                log.info("Successfully synced ratings for {} hotels.", aggregates.size());
            } else {
                log.info("No ratings found to sync.");
            }
        } catch (Exception e) {
            log.error("Failed to sync hotel ratings", e);
        }
    }
}
