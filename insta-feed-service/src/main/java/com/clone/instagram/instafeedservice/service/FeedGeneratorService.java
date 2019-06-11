package com.clone.instagram.instafeedservice.service;

import com.clone.instagram.instafeedservice.client.GraphServiceClient;
import com.clone.instagram.instafeedservice.config.JwtConfig;
import com.clone.instagram.instafeedservice.entity.UserFeed;
import com.clone.instagram.instafeedservice.exception.UnableToGetFollowersException;
import com.clone.instagram.instafeedservice.model.Post;
import com.clone.instagram.instafeedservice.model.User;
import com.clone.instagram.instafeedservice.payload.PagedResult;
import com.clone.instagram.instafeedservice.repository.FeedRepository;
import com.clone.instagram.instafeedservice.util.AppConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class FeedGeneratorService {

    @Autowired private AuthService tokenService;
    @Autowired private GraphServiceClient graphClient;
    @Autowired private JwtConfig jwtConfig;
    @Autowired private FeedRepository feedRepository;

    public void addToFeed(Post post) {
        log.info("adding post {} to feed for user {}" ,
                post.getUsername(), post.getId());

        String token = tokenService.getAccessToken();

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

    private UserFeed convertTo(User user, Post post) {
        return UserFeed
                .builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .postId(post.getId())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
