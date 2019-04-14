package com.clone.instagram.instamediaservice.service;


import com.clone.instagram.instamediaservice.exception.InvalidFileException;
import com.clone.instagram.instamediaservice.exception.InvalidFileNameException;
import com.clone.instagram.instamediaservice.exception.StorageException;
import com.clone.instagram.instamediaservice.model.ImageMetadata;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDirectory;

    @Value("${file.path.prefix}")
    private String filePathPrefix;

    @Autowired
    private Environment environment;


    public ImageMetadata store(MultipartFile file, String username) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());

        log.info("storing file {}", filename);

        try {
            if (file.isEmpty()) {
                log.warn("failed to store empty file {}", filename);
                throw new InvalidFileException("Failed to store empty file " + filename);
            }

            if (filename.contains("..")) {
                // This is a security check
                log.warn("cannot store file with relative path {}", filename);
                throw new InvalidFileNameException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }

            String extension = FilenameUtils.getExtension(filename);
            String newFilename = UUID.randomUUID() + "." + extension;

            try (InputStream inputStream = file.getInputStream()) {
                Path userDir = Paths.get(uploadDirectory + username);

                if(Files.notExists(userDir)) {
                    Files.createDirectory(userDir);
                }

                Files.copy(inputStream, userDir.resolve(newFilename),
                        StandardCopyOption.REPLACE_EXISTING);
            }

            String port = environment.getProperty("local.server.port");
            String hostName = InetAddress.getLocalHost().getHostName();

            String fileUrl = String.format("http://%s:%s%s/%s/%s",
                    hostName, port, filePathPrefix, username, newFilename);

            log.info("successfully stored file {} location {}", filename, fileUrl);

            return new ImageMetadata(newFilename, fileUrl, file.getContentType());
        }
        catch (IOException e) {
            log.error("failed to store file {} error: {}", filename, e);
            throw new StorageException("Failed to store file " + filename, e);
        }
    }
}
