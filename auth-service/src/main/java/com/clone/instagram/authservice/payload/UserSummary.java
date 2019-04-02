package com.clone.instagram.authservice.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSummary {

    private String id;
    private String username;
    private String name;
    private String profilePicture;
}
