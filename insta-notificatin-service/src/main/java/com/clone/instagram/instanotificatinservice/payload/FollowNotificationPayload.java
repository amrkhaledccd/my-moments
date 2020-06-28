package com.clone.instagram.instanotificatinservice.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FollowNotificationPayload  extends NotificationEventPayload{

    private String followerId;
    private String followerUsername;
    private String followerProfilePic;
}
