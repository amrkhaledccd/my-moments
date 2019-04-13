package com.clone.instagram.instamediaservice.repository;

import com.clone.instagram.instamediaservice.model.ImageMetadata;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImageMetadataRepository extends MongoRepository<ImageMetadata, String> {

}
