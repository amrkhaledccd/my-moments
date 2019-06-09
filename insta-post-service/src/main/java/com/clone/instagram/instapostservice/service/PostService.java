package com.clone.instagram.instapostservice.service;

import com.clone.instagram.instapostservice.config.JwtConfig;
import com.clone.instagram.instapostservice.exception.NotAllowedException;
import com.clone.instagram.instapostservice.exception.ResourceNotFoundException;
import com.clone.instagram.instapostservice.messaging.PostEventSender;
import com.clone.instagram.instapostservice.model.Post;
import com.clone.instagram.instapostservice.payload.PostRequest;
import com.clone.instagram.instapostservice.payload.UserSummary;
import com.clone.instagram.instapostservice.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@Slf4j
public class PostService {

    @Autowired private PostRepository postRepository;
    @Autowired private AuthService authService;
    @Autowired private PostEventSender postEventSender;
    @Autowired private JwtConfig jwtConfig;


    public Post createPost(PostRequest postRequest, String authHeader) {
        log.info("creating post image url {}", postRequest.getImageUrl());

        String token = authHeader.replace(jwtConfig.getPrefix(), "");
        UserSummary userSummary = authService.getUserSummary(jwtConfig.getPrefix() + token);

        Post post = new Post(postRequest.getImageUrl(), postRequest.getCaption());
        post.setProfilePic(userSummary.getProfilePicture());

        post = postRepository.save(post);
        postEventSender.sendPostCreated(post);

        log.info("post {} is saved successfully for user {}",
                post.getId(), post.getUsername());

        return post;
    }

    public void deletePost(String postId, String username) {
        log.info("deleting post {}", postId);

        postRepository
                .findById(postId)
                .map(post -> {
                    if(!post.getUsername().equals(username)) {
                        log.warn("user {} is not allowed to delete post id {}", username, postId);
                        throw new NotAllowedException(username, "post id " + postId, "delete");
                    }

                    postRepository.delete(post);
                    postEventSender.sendPostDeleted(post);
                    return post;
                })
                .orElseThrow(() -> {
                    log.warn("post not found id {}", postId);
                    return new ResourceNotFoundException(postId);
                });
    }

    public List<Post> postsByUsername(String username) {
        return postRepository.findByUsernameOrderByCreatedAtDesc(username);
    }

    public List<Post> postsByIdIn(List<String> ids) {
        return postRepository.findByIdInOrderByCreatedAtDesc(ids);
    }

}
