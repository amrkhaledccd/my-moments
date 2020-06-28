package com.clone.instagram.instanotificatinservice.messaging;

import com.clone.instagram.instanotificatinservice.payload.NotificationEventPayload;
import com.clone.instagram.instanotificatinservice.service.EmitterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class NotificationEventListener {

    @Autowired private EmitterService emitterService;

    @StreamListener(NotificationEventStream.INPUT)
    public void onMessage(Message<NotificationEventPayload> message) {

        NotificationEventType eventType = message.getPayload().getEventType();

        log.info("received message to process eventType {}",
                eventType.name());

        Acknowledgment acknowledgment =
                message.getHeaders().get(KafkaHeaders.ACKNOWLEDGMENT, Acknowledgment.class);

        emitterService.pushNotification(message.getPayload());

        if(acknowledgment != null) {
            acknowledgment.acknowledge();
        }
    }
}
