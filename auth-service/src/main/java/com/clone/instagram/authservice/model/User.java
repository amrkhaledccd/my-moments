package com.clone.instagram.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.HashSet;
import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {

    public User(User user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.active = user.active;
        this.userProfile = user.userProfile;
        this.roles = user.roles;
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.active = true;
        this.roles = new HashSet<Role>() {{ new Role("USER"); }};
    }

    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private boolean active;
    private Profile userProfile;
    private Set<Role> roles;
}
