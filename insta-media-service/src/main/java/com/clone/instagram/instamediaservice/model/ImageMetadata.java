package com.clone.instagram.instamediaservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@Document
public class ImageMetadata {

    @Id
    private String id;
    private String username;
    private String filename;
    private String uri;
    private String fileType;
}
