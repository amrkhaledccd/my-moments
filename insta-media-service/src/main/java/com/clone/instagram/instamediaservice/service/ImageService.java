package com.clone.instagram.instamediaservice.service;

import com.clone.instagram.instamediaservice.model.ImageMetadata;
import com.clone.instagram.instamediaservice.repository.ImageMetadataRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class ImageService {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private ImageMetadataRepository imageMetadataRepository;


    public ImageMetadata upload(MultipartFile file, String username) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());

        log.info("storing file {}", filename);

        ImageMetadata metadata = fileStorageService.store(file, username);
        return imageMetadataRepository.save(metadata);
    }
}
