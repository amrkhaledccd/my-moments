package com.clone.instagram.authservice.endpoint;

import com.clone.instagram.authservice.model.User;
import com.clone.instagram.authservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserEndpoint {

    private UserService userService;

    public UserEndpoint(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/userinfo")
    public Principal user(Principal principal) {
        return principal;
    }


    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(User user) {
        return userService.createUser(user);
    }
}