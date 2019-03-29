package com.clone.instagram.instadiscovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class InstaDiscoveryApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstaDiscoveryApplication.class, args);
	}

}
