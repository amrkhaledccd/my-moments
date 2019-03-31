package com.clone.instagram.authservice.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {

    private Boolean success;
    private String message;
}
