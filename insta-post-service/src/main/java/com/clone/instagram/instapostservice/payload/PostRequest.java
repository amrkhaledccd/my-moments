package com.clone.instagram.instapostservice.payload;

import lombok.Data;

@Data
public class PostRequest {

    private String imageUrl;
    private String caption;
}
