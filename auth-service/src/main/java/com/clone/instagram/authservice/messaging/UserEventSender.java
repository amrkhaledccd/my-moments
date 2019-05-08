package com.clone.instagram.authservice.messaging;

import com.clone.instagram.authservice.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserEventSender {

    private Channels channels;
    private final String EVENT_TYPE_HEADER = "eventType";
    private final String OLD_PIC_URL_HEADER = "oldProfilePicUrl";
    private final String KEY_HEADER = "key";

    public UserEventSender(Channels channels) {
        this.channels = channels;
    }

    public void sendUserCreated(User user) {
        log.info("sending user created event for user {}", user.getUsername());

        Message<User> message =
                MessageBuilder
                        .withPayload(user)
                        .setHeader(KEY_HEADER, user.getId())
                        .setHeader(EVENT_TYPE_HEADER, UserEventType.CREATED)
                        .build();

        sendUserChangedEvent(message);
    }

    public void sendUserUpdated(User user) {
        log.info("sending user updated event for user {}", user.getUsername());

        Message<User> message =
                MessageBuilder
                        .withPayload(user)
                        .setHeader(KEY_HEADER, user.getId())
                        .setHeader(EVENT_TYPE_HEADER, UserEventType.UPDATED)
                        .build();

        sendUserChangedEvent(message);
    }

    public void sendProfilePicChanged(User user, String oldPicUrl) {
        log.info("sending profile pic changed event for user {}", user.getUsername());

        Message<User> message =
                MessageBuilder
                        .withPayload(user)
                        .setHeader(KEY_HEADER, user.getId())
                        .setHeader(EVENT_TYPE_HEADER, UserEventType.PROFILE_PIC_CHANGED)
                        .setHeader(OLD_PIC_URL_HEADER, oldPicUrl)
                        .build();

        sendUserChangedEvent(message);
    }

    private void sendUserChangedEvent(Message<User> message) {
        channels.momentsUserChanged().send(message);

        log.info("user event {} sent to topic {} for user {}",
                message.getHeaders().get(EVENT_TYPE_HEADER),
                channels.OUTPUT,
                message.getPayload().getUsername());
    }
}
