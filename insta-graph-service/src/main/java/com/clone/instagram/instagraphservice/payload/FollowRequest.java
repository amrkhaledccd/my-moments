package com.clone.instagram.instagraphservice.payload;


import lombok.Data;

@Data
public class FollowRequest {

    UserPayload follower;
    UserPayload following;
}
