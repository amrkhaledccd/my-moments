package com.clone.instagram.instafeedservice.service;

import com.clone.instagram.instafeedservice.client.PostServiceClient;
import com.clone.instagram.instafeedservice.exception.UnableToGetPostsException;
import com.clone.instagram.instafeedservice.model.Post;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PostService {

    @Autowired private TokenService tokenService;
    @Autowired private PostServiceClient postServiceClient;

    public List<Post> findPostsIn(List<String> ids) {
        log.info("finding posts for ids {}", ids);

        String token = tokenService.getAccessToken();

        ResponseEntity<List<Post>> response =
                postServiceClient.findPostsByIdIn("Bearer " + token, ids);

        if(response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new UnableToGetPostsException(
                    String.format("unable to get posts for ids", ids));
        }
    }
}
