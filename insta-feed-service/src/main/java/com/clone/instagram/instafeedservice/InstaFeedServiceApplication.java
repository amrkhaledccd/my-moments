package com.clone.instagram.instafeedservice;

import com.clone.instagram.instafeedservice.client.PostServiceClient;
import com.clone.instagram.instafeedservice.entity.UserFeed;
import com.clone.instagram.instafeedservice.messaging.PostEventStream;
import com.clone.instagram.instafeedservice.repository.FeedRepository;
import com.clone.instagram.instafeedservice.service.TokenService;
import com.datastax.driver.core.PagingState;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.context.annotation.Bean;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;


@SpringBootApplication
@EnableBinding(PostEventStream.class)
@EnableFeignClients
public class InstaFeedServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstaFeedServiceApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

//	@Bean
	public CommandLineRunner init(FeedRepository repository,
								  PostServiceClient postServiceClient,
								  TokenService tokenService) {
		return args -> {

			Slice<UserFeed> page = repository.findByKeyUsername("mosalah", CassandraPageRequest.first(2));

			String pageState = ((CassandraPageRequest)page.getPageable()).getPagingState().toString();

		 	page = repository.findByKeyUsername("mosalah",
					CassandraPageRequest.of(PageRequest.of(0, 2), PagingState.fromString(pageState)));

			page.forEach(System.out::println);

			String token = tokenService.getAccessToken();

			List<String> postIds = page.stream().map(feed -> feed.getKey().getPostId()).collect(Collectors.toList());

//			postServiceClient.findPostsByIdIn("Bearer " + token, postIds).stream().forEach(System.out::println);
		};
	}
}
