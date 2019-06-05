package com.clone.instagram.instafeedservice.service;

import com.clone.instagram.instafeedservice.entity.UserFeed;
import com.clone.instagram.instafeedservice.exception.ResourceNotFoundException;
import com.clone.instagram.instafeedservice.model.Post;
import com.clone.instagram.instafeedservice.payload.SlicedResult;
import com.clone.instagram.instafeedservice.repository.FeedRepository;
import com.clone.instagram.instafeedservice.util.AppConstants;
import com.datastax.driver.core.PagingState;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FeedService {

    @Autowired private FeedRepository feedRepository;
    @Autowired private PostService postService;

    public SlicedResult<Post> getUserFeed(String username, Optional<String> pagingState) {

        log.info("getting feed for user {} isFirstPage {}", username, pagingState.isEmpty());

        CassandraPageRequest request = pagingState
                .map(pState -> CassandraPageRequest
                        .of(PageRequest.of(0, AppConstants.PAGE_SIZE), PagingState.fromString(pState)))
                .orElse(CassandraPageRequest.first(AppConstants.PAGE_SIZE));

        Slice<UserFeed> page = feedRepository.findByKeyUsername(username, request);

        if(page.isEmpty()) {
            throw new ResourceNotFoundException(
                    String.format("Feed not found for user %s", username));
        }

        String pageState = null;

        if(!page.isLast()) {
           pageState = ((CassandraPageRequest)page.getPageable()).getPagingState().toString();
        }

        List<String> postIds = page.stream()
                .map(feed -> feed.getKey().getPostId())
                .collect(Collectors.toList());

        List<Post> posts = postService.findPostsIn(postIds);

        return SlicedResult
                .<Post>builder()
                .content(posts)
                .isLast(page.isLast())
                .pagingState(pageState)
                .build();
    }
}
