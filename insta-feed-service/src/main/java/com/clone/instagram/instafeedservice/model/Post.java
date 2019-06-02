package com.clone.instagram.instafeedservice.model;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;


@Data
@Builder
public class Post {

    private String postId;
    private Instant createdAt;
    private String username;
}
