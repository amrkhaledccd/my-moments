package com.clone.instagram.authservice.endpoint;

import com.clone.instagram.authservice.exception.*;
import com.clone.instagram.authservice.model.Profile;
import com.clone.instagram.authservice.model.User;
import com.clone.instagram.authservice.payload.ApiResponse;
import com.clone.instagram.authservice.payload.SignUpRequest;
import com.clone.instagram.authservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;

@RestController
@Slf4j
public class UserEndpoint {

    private UserService userService;

    public UserEndpoint(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/users/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findUser(@PathVariable("username") String username) {
        log.info("retrieving user {}", username);

        return  userService
                .findByUsername(username)
                .map(user -> ResponseEntity.ok(user))
                .orElseThrow(() -> new ResourceNotFoundException(username));
    }


    @PostMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createUser(@Valid @RequestBody SignUpRequest payload) {
        log.info("creating user {}", payload.getUsername());

        User user = User
                .builder()
                .username(payload.getUsername())
                .email(payload.getEmail())
                .password(payload.getPassword())
                .userProfile(Profile
                        .builder()
                        .displayName(payload.getName())
                        .build())
                .build();

        try {
            userService.registerUser(user);
        } catch (UsernameAlreadyExistsException | EmailAlreadyExistsException e) {
            throw new BadRequestException(e.getMessage());
        }

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(user.getUsername()).toUri();

        return ResponseEntity
                .created(location)
                .body(new ApiResponse(true,"User registered successfully"));
    }
}