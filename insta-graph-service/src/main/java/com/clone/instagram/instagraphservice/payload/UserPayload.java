package com.clone.instagram.instagraphservice.payload;


import lombok.Data;

@Data
public class UserPayload {

    private String id;
    private String username;
    private String name;
    private String profilePicture;
}
