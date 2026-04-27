package com.APIGateway.APIGateway.service;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {
    public static final List<String> openApiEndPoints = List.of(
            "/auth/login",
            "/auth/signup"
    );
    public Predicate<ServerHttpRequest> isSecure = serverHttpRequest -> openApiEndPoints.stream().noneMatch(endPoint -> serverHttpRequest.getURI().getPath().contains(endPoint));
}
