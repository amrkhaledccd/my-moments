package com.clone.instagram.authservice.messaging;

import com.clone.instagram.authservice.model.User;
import com.clone.instagram.authservice.payload.UserEventPayload;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class UserEventSender {

    private UserEventStream channels;
    private final String KEY_HEADER = "key";

    public UserEventSender(UserEventStream channels) {
        this.channels = channels;
    }

    public void sendUserCreated(User user) {
        log.info("sending user created event for user {}", user.getUsername());
        sendUserChangedEvent(convertTo(user, UserEventType.CREATED));
    }

    public void sendUserUpdated(User user) {
        log.info("sending user updated event for user {}", user.getUsername());
        sendUserChangedEvent(convertTo(user, UserEventType.UPDATED));
    }

    public void sendProfilePicChanged(User user, String oldPicUrl) {
        log.info("sending profile pic changed event for user {}", user.getUsername());

        UserEventPayload payload = convertTo(user, UserEventType.PROFILE_PIC_CHANGED);
        payload.setOldProfilePicUrl(oldPicUrl);

        sendUserChangedEvent(payload);
    }

    private void sendUserChangedEvent(UserEventPayload payload) {

        Message<UserEventPayload> message =
                MessageBuilder
                        .withPayload(payload)
                        .setHeader(KEY_HEADER, payload.getId())
                        .build();

        channels.momentsUserChanged().send(message);

        log.info("user event {} sent to topic {} for user {}",
                message.getPayload().getEventType().name(),
                channels.OUTPUT,
                message.getPayload().getUsername());
    }

    private UserEventPayload convertTo(User user, UserEventType eventType) {
        return UserEventPayload
                .builder()
                .eventType(eventType)
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .displayName(user.getUserProfile().getDisplayName())
                .profilePictureUrl(user.getUserProfile().getProfilePictureUrl()).build();
    }
}
