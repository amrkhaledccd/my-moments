package com.clone.instagram.instanotificatinservice.service;

import com.clone.instagram.instanotificatinservice.exception.UnableToPushNotificationException;
import com.clone.instagram.instanotificatinservice.payload.NotificationEventPayload;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class EmitterService {

    List<SseEmitter> emitters = new ArrayList<>();

    public void addEmitter(SseEmitter emitter) {
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitters.add(emitter);
    }

    public void pushNotification(NotificationEventPayload event) {
        log.info("pushing {} notification for user {}",
                event.getEventType().name(), event.getUsername());

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter
                        .event()
                        .name(event.getUsername())
                        .data(event));

            } catch (IOException e) {
                throw new UnableToPushNotificationException(
                        String.format("unable to push %s notification for user %s, %s",
                                event.getEventType().name(), event.getUsername(), e));
            }
        });
    }
}
