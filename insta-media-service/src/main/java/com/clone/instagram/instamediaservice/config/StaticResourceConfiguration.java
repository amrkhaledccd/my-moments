package com.clone.instagram.instamediaservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDirectory;

    @Value("${file.path.prefix}")
    private String filePathPrefix;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler(filePathPrefix + "/**")
                .addResourceLocations("file:" + uploadDirectory);
    }
}
