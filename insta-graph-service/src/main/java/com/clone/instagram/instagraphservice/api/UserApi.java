package com.clone.instagram.instagraphservice.api;


import com.clone.instagram.instagraphservice.model.User;
import com.clone.instagram.instagraphservice.payload.ApiResponse;
import com.clone.instagram.instagraphservice.payload.FollowRequest;
import com.clone.instagram.instagraphservice.service.UserService;
import com.clone.instagram.instagraphservice.util.AppConstants;
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

        log.info("received a follow request follow {} following {}",
                request.getFollower().getUsername(),
                request.getFollowing().getUsername());


        userService.follow(
                User.builder()
                        .userId(request.getFollower().getId())
                        .username(request.getFollower().getUsername())
                        .name(request.getFollower().getName())
                        .profilePic(request.getFollower().getProfilePicture())
                        .build(),

                User.builder()
                        .userId(request.getFollowing().getId())
                        .username(request.getFollowing().getUsername())
                        .name(request.getFollowing().getName())
                        .profilePic(request.getFollowing().getProfilePicture())
                        .build()
                );

        String message = String.format("user %s is following user %s",
                request.getFollower().getUsername(),
                request.getFollowing().getUsername());

        log.info(message);

        return ResponseEntity.ok(new ApiResponse(true, message));
    }

    @GetMapping("/users/{username}/degree")
    public ResponseEntity<?> findNodeDegree(@PathVariable String username) {
        log.info("received request to get node degree for {}", username);

        return ResponseEntity.ok(userService.findNodeDegree(username));
    }

    @GetMapping("/users/{usernameA}/following/{usernameB}")
    public ResponseEntity<?> isFollwoing(@PathVariable String usernameA, @PathVariable String usernameB) {
        log.info("received request to check is user {} is following {}"
                , usernameA, usernameB);

        return ResponseEntity.ok(userService.isFollowing(usernameA, usernameB));
    }

    @GetMapping("/users/{username}/followers")
    public ResponseEntity<?> findFollowers(@PathVariable String username) {
        return ResponseEntity.ok(userService.findFollowers(username));
    }

    @GetMapping("/users/paginated/{username}/followers")
    public ResponseEntity<?> findFollowersPaginated(
            @PathVariable String username,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {

        return ResponseEntity.ok(userService.findPaginatedFollowers(username, page, size));
    }

    @GetMapping("/users/{username}/following")
    public ResponseEntity<?> findFollowing(@PathVariable String username) {
        return ResponseEntity.ok(userService.findFollowing(username));
    }

}
