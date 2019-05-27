package com.clone.instagram.instafeedservice.client;

import com.clone.instagram.instafeedservice.exception.UnableToGetAccessTokenException;
import com.clone.instagram.instafeedservice.payload.JwtAuthenticationResponse;
import com.clone.instagram.instafeedservice.payload.ServiceLoginRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class AuthServiceClient {

    private final String AUTH_SERVICE_URL = "http://localhost:9000/signin";

    private RestTemplate restTemplate;
    private ServiceLoginRequest loginRequest;

    public AuthServiceClient(
            RestTemplate restTemplate,
            ServiceLoginRequest loginRequest) {

        this.restTemplate = restTemplate;
        this.loginRequest = loginRequest;
    }

    public String getAccessToken() {

        ResponseEntity<JwtAuthenticationResponse> jwtResponse =
                restTemplate.postForEntity(AUTH_SERVICE_URL, loginRequest, JwtAuthenticationResponse.class);

        if(!jwtResponse.getStatusCode().is2xxSuccessful()) {
            String message = String.format("unable to get access token for service account, %s",
                    jwtResponse.getStatusCode());

            log.error(message);
            throw new UnableToGetAccessTokenException(message);
        }

        return jwtResponse.getBody().getAccessToken();

    }

}
