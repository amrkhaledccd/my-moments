package com.clone.instagram.authservice.service;

import com.clone.instagram.authservice.exception.EmailAlreadyExistsException;
import com.clone.instagram.authservice.exception.ResourceNotFoundException;
import com.clone.instagram.authservice.exception.UsernameAlreadyExistsException;
import com.clone.instagram.authservice.messaging.UserEventSender;
import com.clone.instagram.authservice.model.Role;
import com.clone.instagram.authservice.repository.UserRepository;
import com.clone.instagram.authservice.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private UserEventSender userEventSender;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       UserEventSender userEventSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userEventSender = userEventSender;
    }

    public List<User> findAll() {
        log.info("retrieving all users");
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String username) {
        log.info("retrieving user {}", username);
        return userRepository.findByUsername(username);
    }

    public List<User> findByUsernameIn(List<String> usernames) {
        return userRepository.findByUsernameIn(usernames);
    }

    public User registerUser(User user) {
        log.info("registering user {}", user.getUsername());

        if(userRepository.existsByUsername(user.getUsername())) {
            log.warn("username {} already exists.", user.getUsername());

            throw new UsernameAlreadyExistsException(
                    String.format("username %s already exists", user.getUsername()));
        }

        if(userRepository.existsByEmail(user.getEmail())) {
            log.warn("email {} already exists.", user.getEmail());

            throw new EmailAlreadyExistsException(
                    String.format("email %s already exists", user.getEmail()));
        }
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<>() {{
            add(Role.USER);
        }});

        User savedUser = userRepository.save(user);
        userEventSender.sendUserCreated(savedUser);

        return savedUser;
    }

    public User updateProfilePicture(String uri, String id) {
        log.info("update profile picture {} for user {}", uri, id);

       return userRepository
               .findById(id)
               .map(user -> {
                   String oldProfilePic = user.getUserProfile().getProfilePictureUrl();
                   user.getUserProfile().setProfilePictureUrl(uri);
                   User savedUser = userRepository.save(user);

                   userEventSender.sendUserUpdated(savedUser, oldProfilePic);

                   return savedUser;
               })
               .orElseThrow(() ->
                       new ResourceNotFoundException(String.format("user id %s not found", id)));
    }
}
