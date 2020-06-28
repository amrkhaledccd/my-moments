package com.clone.instagram.instanotificatinservice.api;

import com.clone.instagram.instanotificatinservice.messaging.NotificationEventType;
import com.clone.instagram.instanotificatinservice.payload.FollowNotificationPayload;
import com.clone.instagram.instanotificatinservice.service.EmitterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Slf4j
public class NotificationApi {

    @Autowired private EmitterService emitterService;

    @GetMapping("/subscription")
    public SseEmitter subsribe() {
            log.info("subscribing...");

            SseEmitter sseEmitter = new SseEmitter();
            emitterService.addEmitter(sseEmitter);

            return sseEmitter;
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {

        FollowNotificationPayload payload =
                FollowNotificationPayload
                        .builder()
                        .followerId("testId")
                        .followerProfilePic("http://test")
                        .followerUsername("nicoel")
                        .build();

        payload.setUsername("amrkhaled");
        payload.setEventType(NotificationEventType.FOLLOW);

        emitterService.pushNotification(payload);

        return ResponseEntity.ok().body(payload);
    }
}
