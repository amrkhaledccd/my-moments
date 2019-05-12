package com.clone.instagram.instagraphservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameNotExistsException extends RuntimeException {

    public UsernameNotExistsException(String message) {
        super(message);
    }
}

