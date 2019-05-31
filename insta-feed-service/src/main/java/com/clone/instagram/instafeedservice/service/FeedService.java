package com.clone.instagram.instafeedservice.service;

import com.clone.instagram.instafeedservice.client.AuthServiceClient;
import com.clone.instagram.instafeedservice.client.GraphServiceClient;
import com.clone.instagram.instafeedservice.config.JwtConfig;
import com.clone.instagram.instafeedservice.exception.UnableToGetAccessTokenException;
import com.clone.instagram.instafeedservice.model.Post;
import com.clone.instagram.instafeedservice.model.User;
import com.clone.instagram.instafeedservice.payload.JwtAuthenticationResponse;
import com.clone.instagram.instafeedservice.payload.PagedResult;
import com.clone.instagram.instafeedservice.payload.ServiceLoginRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class FeedService {

    @Autowired private AuthServiceClient authClient;
    @Autowired private ServiceLoginRequest serviceLoginRequest;
    @Autowired private GraphServiceClient graphClient;
    @Autowired private JwtConfig jwtConfig;

    public void addToFeed(Post post) {
        log.info("adding post {} to feed for user {}" ,
                post.getUsername(), post.getPostId());

        String token = getAccessToken();

        boolean isLast = false;
        int page = 0;
        int size = 2;

        while(!isLast) {

            ResponseEntity<PagedResult<User>> response =
                    graphClient.findFollowers(jwtConfig.getPrefix() + token, post.getUsername(), page, size);

            if(response.getStatusCode().is2xxSuccessful()) {

                List<User> users = response.getBody().getContent();
                log.info("found {} followers for user {}", users.size(), post.getUsername());

                isLast = response.getBody().isLast();
                ++page;

            } else {
                log.warn("unable to get followers for user {}", post.getUsername());
                isLast = true;
            }
        }
    }

    private String getAccessToken() {

       ResponseEntity<JwtAuthenticationResponse> response =
               authClient.signin(serviceLoginRequest);

       if(!response.getStatusCode().is2xxSuccessful()) {
           String message = String.format("unable to get access token for service account, %s",
                   response.getStatusCode());

           log.error(message);
           throw new UnableToGetAccessTokenException(message);
       }

        return response.getBody().getAccessToken();
    }
}
