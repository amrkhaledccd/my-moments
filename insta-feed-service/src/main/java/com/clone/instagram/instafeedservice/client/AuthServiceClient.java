package com.clone.instagram.instafeedservice.client;

import com.clone.instagram.instafeedservice.payload.JwtAuthenticationResponse;
import com.clone.instagram.instafeedservice.payload.ServiceLoginRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@FeignClient(serviceId = "INSTA-AUTH")
public interface AuthServiceClient {


    @RequestMapping(method = RequestMethod.POST, value = "signin")
    ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody ServiceLoginRequest request);

}
