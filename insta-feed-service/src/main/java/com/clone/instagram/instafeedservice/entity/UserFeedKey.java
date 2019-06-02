package com.clone.instagram.instafeedservice.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.Indexed;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

@PrimaryKeyClass
@Builder
@Data
public class UserFeedKey {

    @PrimaryKeyColumn(name = "user_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private String userId;

    @PrimaryKeyColumn(name = "username", ordinal = 1 )
    @Indexed
    private String username;

    @PrimaryKeyColumn(name = "post_id", ordinal = 2)
    private String postId;
}
