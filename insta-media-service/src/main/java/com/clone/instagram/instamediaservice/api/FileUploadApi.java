package com.clone.instagram.instamediaservice.api;


import com.clone.instagram.instamediaservice.payload.UploadFileResponse;
import com.clone.instagram.instamediaservice.service.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
public class FileUploadApi {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/files")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        log.info("received a request to upload file {}", filename);

        String uri = fileStorageService.store(file);

        return new UploadFileResponse(filename, uri,
                file.getContentType());
    }

}
