package com.clone.instagram.instagraphservice.messaging;


import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface UserEventStream {

    String INPUT = "momentsUserChanged";

    @Input(INPUT)
    SubscribableChannel momentsUserChanged();
}
