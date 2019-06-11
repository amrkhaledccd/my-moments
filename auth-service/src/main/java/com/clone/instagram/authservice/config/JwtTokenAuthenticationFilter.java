package com.clone.instagram.authservice.config;

import com.clone.instagram.authservice.model.InstaUserDetails;
import com.clone.instagram.authservice.service.JwtTokenProvider;
import com.clone.instagram.authservice.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static java.util.stream.Collectors.toList;

public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    private final JwtConfig jwtConfig;
    private JwtTokenProvider tokenProvider;
    private UserService userService;
    private String serviceUsername;

    public JwtTokenAuthenticationFilter(
            String serviceUsername,
            JwtConfig jwtConfig,
            JwtTokenProvider tokenProvider,
            UserService userService) {

        this.serviceUsername = serviceUsername;
        this.jwtConfig = jwtConfig;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // 1. get the authentication header. Tokens are supposed to be passed in the authentication header
        String header = request.getHeader(jwtConfig.getHeader());

        // 2. validate the header and check the prefix
        if(header == null || !header.startsWith(jwtConfig.getPrefix())) {
            chain.doFilter(request, response);  		// If not valid, go to the next filter.
            return;
        }

        // If there is no token provided and hence the user won't be authenticated.
        // It's Ok. Maybe the user accessing a public path or asking for a token.

        // All secured paths that needs a token are already defined and secured in config class.
        // And If user tried to access without access token, then he won't be authenticated and an exception will be thrown.

        // 3. Get the token
        String token = header.replace(jwtConfig.getPrefix(), "");


        if(tokenProvider.validateToken(token)) {

            Claims claims = tokenProvider.getClaimsFromJWT(token);
            String username = claims.getSubject();

            UsernamePasswordAuthenticationToken auth = null;

            if(username.equals(serviceUsername)) { // If it is service account don't load user details

                List<String> authorities = (List<String>) claims.get("authorities");

                auth = new UsernamePasswordAuthenticationToken(username, null,
                                authorities
                                        .stream()
                                        .map(SimpleGrantedAuthority::new)
                                        .collect(toList()));

            } else {

                auth = userService
                        .findByUsername(username)
                        .map(InstaUserDetails::new)
                        .map(userDetails -> {

                          UsernamePasswordAuthenticationToken authentication =
                                  new UsernamePasswordAuthenticationToken(
                                          userDetails, null, userDetails.getAuthorities());
                            authentication
                                    .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                            return authentication;
                        })
                        .orElse(null);
            }

            SecurityContextHolder.getContext().setAuthentication(auth);

        } else {
            SecurityContextHolder.clearContext();
        }

        // go to the next filter in the filter chain
        chain.doFilter(request, response);
    }

}
