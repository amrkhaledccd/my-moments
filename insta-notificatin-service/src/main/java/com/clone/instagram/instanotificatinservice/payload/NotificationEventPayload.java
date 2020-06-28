package com.clone.instagram.instanotificatinservice.payload;

import com.clone.instagram.instanotificatinservice.messaging.NotificationEventType;
import lombok.Data;

@Data
public abstract class NotificationEventPayload {

    protected NotificationEventType eventType;
    protected String username;

}
