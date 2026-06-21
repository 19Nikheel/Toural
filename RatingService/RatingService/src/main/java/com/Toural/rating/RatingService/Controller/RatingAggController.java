package com.Toural.rating.RatingService.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rating/aggregates")
public class RatingAggController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/{type}")
    public Map<Long, Map<String, Number>> getAggregates(@PathVariable String type) {
        Map<Long, Map<String, Number>> result = new HashMap<>();
        String sql;
        String idColumn;
        
        switch (type.toLowerCase()) {
            case "hotel":
                sql = "SELECT hotel_id as id, rating, review_count as count FROM hotel_rating_agg";
                idColumn = "id";
                break;
            case "guide":
                sql = "SELECT guide_id as id, rating, review_count as count FROM guide_rating_agg";
                idColumn = "id";
                break;
            case "driver":
                sql = "SELECT driver_id as id, rating, review_count as count FROM driver_rating_agg";
                idColumn = "id";
                break;
            default:
                throw new IllegalArgumentException("Unknown type: " + type);
        }

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        for (Map<String, Object> row : rows) {
            Long id = ((Number) row.get(idColumn)).longValue();
            Double rating = ((Number) row.get("rating")).doubleValue();
            Integer count = ((Number) row.get("count")).intValue();
            Map<String, Number> data = new HashMap<>();
            data.put("rating", rating);
            data.put("count", count);
            result.put(id, data);
        }
        
        return result;
    }
}
