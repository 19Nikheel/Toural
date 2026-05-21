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
    public static final List<String> internalEndPoints = List.of(
            "/user/add-user"
    );

    public Predicate<ServerHttpRequest> isSecure = serverHttpRequest -> openApiEndPoints.stream().noneMatch(endPoint -> serverHttpRequest.getURI().getPath().contains(endPoint));
    public Predicate<ServerHttpRequest> isInternal = serverHttpRequest -> internalEndPoints.stream().anyMatch(endPoint -> serverHttpRequest.getURI().getPath().contains(endPoint));
}
