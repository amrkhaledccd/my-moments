package com.clone.instagram.instapostservice.service;

import com.clone.instagram.instapostservice.client.AuthServiceClient;
import com.clone.instagram.instapostservice.exception.UnableToGetUserProfileException;
import com.clone.instagram.instapostservice.payload.UserSummary;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private AuthServiceClient authClient;


    public UserSummary getUserSummary(String token) {

        ResponseEntity<UserSummary> response = authClient.getUserSummary(token);

        if(!response.getStatusCode().is2xxSuccessful()) {
            String message = String.format("unable to get user profile for service account, %s",
                    response.getStatusCode());

            log.error(message);
            throw new UnableToGetUserProfileException(message);
        }

        return response.getBody();

    }
}
