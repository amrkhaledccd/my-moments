package com.clone.instagram.instafeedservice.exception;

import com.datastax.driver.core.exceptions.PagingStateException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class RestResponseEntityExceptionHandler
        extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value =
            { PagingStateException.class })
    protected ResponseEntity<?> handleBadRequest(RuntimeException ex,
                                                 WebRequest request) {

        return handleExceptionInternal(ex, ex.getMessage(),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value =
            { ResourceNotFoundException.class })
    protected ResponseEntity<?> handleResourceNotFound(RuntimeException ex,
                                                 WebRequest request) {

        return handleExceptionInternal(ex, ex.getMessage(),
                new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }
}
