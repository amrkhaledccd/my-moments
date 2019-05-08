package com.clone.instagram.authservice.messaging;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface Channels {

    String OUTPUT = "momentsUserChanged";

    @Output(OUTPUT)
    MessageChannel momentsUserChanged();
}
