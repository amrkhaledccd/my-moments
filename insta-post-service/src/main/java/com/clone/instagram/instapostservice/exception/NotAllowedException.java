package com.clone.instagram.instapostservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.FORBIDDEN)
public class NotAllowedException extends RuntimeException {

    public NotAllowedException(String user, String resource, String operation) {
        super(String.format("user %s is not allowed to %s resource %s",
                user, operation, resource));
    }
}
