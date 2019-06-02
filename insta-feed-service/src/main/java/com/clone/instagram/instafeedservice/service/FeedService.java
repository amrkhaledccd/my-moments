package com.clone.instagram.instafeedservice.service;

import com.clone.instagram.instafeedservice.client.AuthServiceClient;
import com.clone.instagram.instafeedservice.client.GraphServiceClient;
import com.clone.instagram.instafeedservice.config.JwtConfig;
import com.clone.instagram.instafeedservice.entity.UserFeed;
import com.clone.instagram.instafeedservice.entity.UserFeedKey;
import com.clone.instagram.instafeedservice.exception.UnableToGetAccessTokenException;
import com.clone.instagram.instafeedservice.exception.UnableToGetFollowersException;
import com.clone.instagram.instafeedservice.model.Post;
import com.clone.instagram.instafeedservice.model.User;
import com.clone.instagram.instafeedservice.payload.JwtAuthenticationResponse;
import com.clone.instagram.instafeedservice.payload.PagedResult;
import com.clone.instagram.instafeedservice.payload.ServiceLoginRequest;
import com.clone.instagram.instafeedservice.repository.FeedRepository;
import com.clone.instagram.instafeedservice.util.AppConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class FeedService {

    @Autowired private AuthServiceClient authClient;
    @Autowired private ServiceLoginRequest serviceLoginRequest;
    @Autowired private GraphServiceClient graphClient;
    @Autowired private JwtConfig jwtConfig;
    @Autowired private FeedRepository feedRepository;

    public void addToFeed(Post post) {
        log.info("adding post {} to feed for user {}" ,
                post.getUsername(), post.getPostId());

        String token = getAccessToken();

        boolean isLast = false;
        int page = 0;
        int size = AppConstants.PAGE_SIZE;

        while(!isLast) {

            ResponseEntity<PagedResult<User>> response =
                    graphClient.findFollowers(jwtConfig.getPrefix() + token, post.getUsername(), page, size);

            if(response.getStatusCode().is2xxSuccessful()) {

                PagedResult<User> result = response.getBody();

                log.info("found {} followers for user {}, page {}",
                        result.getTotalElements(), post.getUsername(), page);

                result.getContent()
                        .stream()
                        .map(user -> convertTo(user, post))
                        .forEach(feedRepository::insert);

                isLast = result.isLast();
                page++;

            } else {
                String message =
                        String.format("unable to get followers for user %s", post.getUsername());

                log.warn(message);
                throw new UnableToGetFollowersException(message);
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

    private UserFeed convertTo(User user, Post post) {
        return UserFeed
                .builder()
                .key(UserFeedKey
                        .builder()
                        .userId(user.getUserId())
                        .username(user.getUsername())
                        .postId(post.getPostId())
                        .build())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
