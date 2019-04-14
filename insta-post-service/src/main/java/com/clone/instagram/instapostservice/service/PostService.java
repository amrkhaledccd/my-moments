package com.clone.instagram.instapostservice.service;

import com.clone.instagram.instapostservice.exception.NotAllowedException;
import com.clone.instagram.instapostservice.exception.ResourceNotFoundException;
import com.clone.instagram.instapostservice.model.Post;
import com.clone.instagram.instapostservice.payload.PostRequest;
import com.clone.instagram.instapostservice.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@Slf4j
public class PostService {

    @Autowired
    private PostRepository postRepository;


    public Post createPost(PostRequest postRequest) {
        log.info("creating post image url {}", postRequest.getImageUrl());

        Post post = new Post(postRequest.getImageUrl(), postRequest.getCaption());
        return postRepository.save(post);
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
                    return post;
                })
                .orElseThrow(() -> {
                    log.warn("post not found id {}", postId);
                    return new ResourceNotFoundException(postId);
                });
    }

    public List<Post> postsByUsername(String username) {
        return postRepository.findByUsername(username);
    }
}
