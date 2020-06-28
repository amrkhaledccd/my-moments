package com.clone.instagram.authservice;

import com.clone.instagram.authservice.config.JwtConfig;
import com.clone.instagram.authservice.messaging.UserEventStream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
@EnableBinding(UserEventStream.class)
@EnableDiscoveryClient
@Slf4j
public class AuthServiceApplication {

	@Value("${spring.data.mongodb.password:not_loaded}")
	private String mongoPwd;

	@Value("${security.service.password:any}")
	private String sec;

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
	}

	@Bean
	public CommandLineRunner init(JwtConfig jwtConfig) {
		return args -> {
			log.info("Configurations prefix: {}, secret: {} mongo password: {},  service password: {}",
					jwtConfig.getPrefix(), jwtConfig.getSecret(), mongoPwd, sec);
		};
	}
}
