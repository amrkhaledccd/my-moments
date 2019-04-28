package com.clone.instagram.instagraphservice.model;

import lombok.Builder;
import lombok.Data;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.Set;

@Data
@Builder
@NodeEntity
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String userId;
    private String username;
    private String name;
    private String profilePic;

    @Relationship(type = "IS_FOLLOWING")
    private Set<Friendship> friendships;

}
