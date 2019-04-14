package com.clone.instagram.instamediaservice.model;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;


@Data
@RequiredArgsConstructor
@Document
public class ImageMetadata {

    @Id
    private String id;

    @CreatedBy
    private String username;

    @CreatedDate
    private Instant createdAt;

    @NonNull
    private String filename;

    @NonNull
    private String uri;

    @NonNull
    private String fileType;
}
