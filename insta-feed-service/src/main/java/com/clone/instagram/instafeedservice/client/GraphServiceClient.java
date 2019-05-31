package com.clone.instagram.instafeedservice.client;

import com.clone.instagram.instafeedservice.model.User;
import com.clone.instagram.instafeedservice.payload.PagedResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@FeignClient(serviceId = "INSTA-GRAPH")
public interface GraphServiceClient {

    @RequestMapping(method = RequestMethod.GET, value = "/users/paginated/{username}/followers")
    ResponseEntity<PagedResult<User>> findFollowers(
            @RequestHeader("Authorization") String token,
            @PathVariable String username,
            @RequestParam int page,
            @RequestParam int size);
}
