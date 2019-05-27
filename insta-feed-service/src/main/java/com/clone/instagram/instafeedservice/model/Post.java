package com.clone.instagram.instafeedservice.model;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;


@Data
@Builder
public class Post {

    private String id;
    private String postId;
    private Instant createdAt;
    private Instant updatedAt;
    private String username;
    private String lastModifiedBy;
    private String imageUrl;
    private String caption;
}
