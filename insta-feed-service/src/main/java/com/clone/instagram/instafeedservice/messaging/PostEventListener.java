package com.clone.instagram.instafeedservice.messaging;

import com.clone.instagram.instafeedservice.model.Post;
import com.clone.instagram.instafeedservice.payload.PostEventPayload;
import com.clone.instagram.instafeedservice.service.FeedService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PostEventListener {

    private FeedService feedService;

    public PostEventListener(FeedService feedService) {
        this.feedService = feedService;
    }

    @StreamListener(PostEventStream.INPUT)
    public void onMessage(Message<PostEventPayload> message) {

        PostEventType eventType = message.getPayload().getEventType();

        log.info("received message to process post {} for user {} eventType {}",
                message.getPayload().getId(),
                message.getPayload().getUsername(),
                eventType.name());

        Acknowledgment acknowledgment =
                message.getHeaders().get(KafkaHeaders.ACKNOWLEDGMENT, Acknowledgment.class);


        switch (eventType) {
            case CREATED:
                feedService.addToFeed(convertTo(message.getPayload()));
                break;
            case UPDATED:
                break;
            case DELETED:
                break;
        }

        if(acknowledgment != null) {
            acknowledgment.acknowledge();
        }
    }

    private Post convertTo(PostEventPayload payload) {
        return Post
                .builder()
                .postId(payload.getId())
                .createdAt(payload.getCreatedAt())
                .updatedAt(payload.getUpdatedAt())
                .username(payload.getUsername())
                .lastModifiedBy(payload.getLastModifiedBy())
                .imageUrl(payload.getImageUrl())
                .caption(payload.getCaption())
                .build();
    }
}
