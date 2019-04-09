package com.clone.instagram.instamediaservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class InstaMediaServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstaMediaServiceApplication.class, args);
	}
}
