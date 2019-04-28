package com.clone.instagram.instagraphservice.api;


import com.clone.instagram.instagraphservice.model.User;
import com.clone.instagram.instagraphservice.payload.ApiResponse;
import com.clone.instagram.instagraphservice.payload.FollowRequest;
import com.clone.instagram.instagraphservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
public class UserApi {

    @Autowired
    private UserService userService;

    @PostMapping("/users/followers")
    public ResponseEntity<?> follow(@RequestBody FollowRequest request) {

        log.info("Received a follow request follow {} following {}",
                request.getFollower().getUsername(),
                request.getFollowing().getUsername());


        userService.follow(
                User.builder()
                        .userId(request.getFollower().getUserId())
                        .username(request.getFollower().getUsername())
                        .name(request.getFollower().getName())
                        .profilePic(request.getFollower().getProfilePic())
                        .build(),

                User.builder()
                        .userId(request.getFollowing().getUserId())
                        .username(request.getFollowing().getUsername())
                        .name(request.getFollowing().getName())
                        .profilePic(request.getFollowing().getProfilePic())
                        .build()
                );

        String message = String.format("User %s is following user %s",
                request.getFollower().getUsername(),
                request.getFollower().getUsername());

        log.info(message);

        return ResponseEntity.ok(new ApiResponse(true, message));
    }

    @GetMapping("/users/{username}/degree")
    public ResponseEntity<?> findNodeDegree(@PathVariable String username) {
        log.info("received request to get node degree for {}", username);

        return ResponseEntity.ok(userService.findNodeDegree(username));
    }
}
