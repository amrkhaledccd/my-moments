package com.clone.instagram.instagraphservice;

import com.clone.instagram.instagraphservice.messaging.UserEventStream;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.stream.annotation.EnableBinding;

@SpringBootApplication
@EnableBinding(UserEventStream.class)
public class InstaGraphServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstaGraphServiceApplication.class, args);
	}
}
