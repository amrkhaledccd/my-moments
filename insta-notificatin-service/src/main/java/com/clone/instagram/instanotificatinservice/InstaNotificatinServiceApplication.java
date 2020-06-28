package com.clone.instagram.instanotificatinservice;

import com.clone.instagram.instanotificatinservice.messaging.NotificationEventStream;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.stream.annotation.EnableBinding;

@SpringBootApplication
@EnableBinding(NotificationEventStream.class)
public class InstaNotificatinServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstaNotificatinServiceApplication.class, args);
	}

}
