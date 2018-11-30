package com.clone.instagram.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import java.util.Date;
import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    @Id
    private String id;
    private String displayName;
    private String profilePictureUrl;
    private Date birthday;
    private Set<Address> addresses;
}
