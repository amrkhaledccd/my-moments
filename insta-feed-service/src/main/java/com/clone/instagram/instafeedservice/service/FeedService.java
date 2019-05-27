package com.clone.instagram.instafeedservice.service;

import com.clone.instagram.instafeedservice.client.AuthServiceClient;
import com.clone.instagram.instafeedservice.model.Post;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class FeedService {

    private AuthServiceClient authClient;

    public FeedService(AuthServiceClient authClient) {
        this.authClient = authClient;
    }

    public void addToFeed(Post post) {
        log.info("adding post {} to feed for user {}" ,
                post.getUsername(), post.getPostId());

        String token = authClient.getAccessToken();

        log.info("token: {}", token);
    }
}
