package com.Toural.UserService.cron;

import com.Toural.UserService.Models.Driver;
import com.Toural.UserService.Models.TouristGuide;
import com.Toural.UserService.Repo.DriverRepository;
import com.Toural.UserService.Repo.TouristGuideRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@Component
public class RatingSyncCronJob {

    private static final Logger log = LoggerFactory.getLogger(RatingSyncCronJob.class);

    @Autowired
    private TouristGuideRepository touristGuideRepository;

    @Autowired
    private DriverRepository driverRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(cron = "0 0 0 * * ?")
    public void syncRatings() {
        log.info("Starting midnight sync of guide and driver ratings from RatingService...");
        try {
            syncType("guide");
            syncType("driver");
        } catch (Exception e) {
            log.error("Failed to sync ratings", e);
        }
    }

    private void syncType(String type) {
        String url = "http://localhost:8084/rating/aggregates/" + type;
        ResponseEntity<Map<Long, Map<String, Number>>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<Long, Map<String, Number>>>() {}
        );

        Map<Long, Map<String, Number>> aggregates = response.getBody();
        if (aggregates != null && !aggregates.isEmpty()) {
            for (Map.Entry<Long, Map<String, Number>> entry : aggregates.entrySet()) {
                Long targetId = entry.getKey();
                Double rating = entry.getValue().get("rating").doubleValue();
                Integer count = entry.getValue().get("count").intValue();

                if ("guide".equals(type)) {
                    touristGuideRepository.findByIdUserId(targetId).ifPresent(guide -> {
                        guide.setRatingAvg(BigDecimal.valueOf(rating));
                        guide.setRatingCount(count);
                        touristGuideRepository.save(guide);
                    });
                } else if ("driver".equals(type)) {
                    driverRepository.findByIdUserId(targetId).ifPresent(driver -> {
                        driver.setRatingAvg(BigDecimal.valueOf(rating));
                        driver.setRatingCount(count);
                        driverRepository.save(driver);
                    });
                }
            }
            log.info("Successfully synced ratings for {} {}s.", aggregates.size(), type);
        }
    }
}
