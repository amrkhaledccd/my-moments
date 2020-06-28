package com.clone.instagram.instanotificatinservice.messaging;


import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface NotificationEventStream {

    String INPUT = "momentsNotifications";

    @Input(INPUT)
    SubscribableChannel momentsNotifications();
}
