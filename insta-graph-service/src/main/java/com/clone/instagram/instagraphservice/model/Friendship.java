package com.clone.instagram.instagraphservice.model;


import lombok.Builder;
import org.neo4j.ogm.annotation.*;


@RelationshipEntity("IS_FOLLOWING")
@Builder
public class Friendship {

    @Id
    @GeneratedValue
    private Long id;

    @StartNode
    private User startNode;

    @EndNode
    private User endNode;
}
