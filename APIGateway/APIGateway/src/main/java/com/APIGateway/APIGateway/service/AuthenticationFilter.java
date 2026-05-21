package com.APIGateway.APIGateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {
    @Autowired
    private RouteValidator routeValidator;

    @Autowired
    private JwtService jwtService;

    public AuthenticationFilter() {
        super(Config.class);
    }

    public static class Config{

    }
    @Override
    public GatewayFilter apply(Config config) {
        return (((exchange, chain) -> {
            if (routeValidator.isInternal.test(exchange.getRequest())) {
                throw new RuntimeException("Access Denied: Internal API");
            }
            if (routeValidator.isSecure.test(exchange.getRequest())) {
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("Authorization Required");
                }
                String getHeaders = exchange.getRequest().getHeaders().remove(HttpHeaders.AUTHORIZATION).get(0);
                if (getHeaders!=null && getHeaders.contains("Bearer ")) {
                    String token = getHeaders.substring(7);
                    jwtService.validateToken(token);
                }else {
                    throw new RuntimeException("token is expired or tampered");
                }
            }
            return chain.filter(exchange);
        }));
    }
}
