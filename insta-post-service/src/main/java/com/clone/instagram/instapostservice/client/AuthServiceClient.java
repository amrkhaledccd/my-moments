package com.clone.instagram.instapostservice.client;

import com.clone.instagram.instapostservice.payload.UserSummary;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@FeignClient(serviceId = "INSTA-AUTH")
public interface AuthServiceClient {

    @RequestMapping(method =  RequestMethod.GET, value = "/users/me")
    ResponseEntity<UserSummary> getUserSummary(
            @RequestHeader("Authorization") String token);

}
