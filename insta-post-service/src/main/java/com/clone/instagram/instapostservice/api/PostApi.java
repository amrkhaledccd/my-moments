package com.clone.instagram.instapostservice.api;


import com.clone.instagram.instapostservice.model.Post;
import com.clone.instagram.instapostservice.payload.ApiResponse;
import com.clone.instagram.instapostservice.payload.PostRequest;
import com.clone.instagram.instapostservice.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
public class PostApi {

    @Autowired
    private PostService postService;

    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest){
        log.info("received a request to create a post for image {}", postRequest.getImageUrl());

        Post post = postService.createPost(postRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/posts/{id}")
                .buildAndExpand(post.getId()).toUri();

        return ResponseEntity
                .created(location)
                .body(new ApiResponse(true, "Post created successfully"));
    }

    @DeleteMapping("/posts/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable("id") String id, @AuthenticationPrincipal Principal user) {
        log.info("received a delete request for post id {} from user {}", id, user.getName());
        postService.deletePost(id, user.getName());
    }

    @GetMapping("/posts/me")
    public ResponseEntity<?> findCurrentUserPosts(@AuthenticationPrincipal Principal principal) {
        log.info("retrieving posts for user {}", principal.getName());

        List<Post> posts = postService.postsByUsername(principal.getName());
        log.info("found {} posts for user {}", posts.size(), principal.getName());

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts/{username}")
    public ResponseEntity<?> findUserPosts(@PathVariable("username") String username) {
        log.info("retrieving posts for user {}", username);

        List<Post> posts = postService.postsByUsername(username);
        log.info("found {} posts for user {}", posts.size(), username);

        return ResponseEntity.ok(posts);
    }

    @PostMapping("/posts/in")
    public ResponseEntity<?> findPostsByIdIn(@RequestBody List<String> ids) {
        log.info("retrieving posts for {} ids", ids.size());

        List<Post> posts = postService.postsByIdIn(ids);
        log.info("found {} posts", posts.size());

        return ResponseEntity.ok(posts);
    }
}
