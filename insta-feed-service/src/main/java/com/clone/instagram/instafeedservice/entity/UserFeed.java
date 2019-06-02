package com.clone.instagram.instafeedservice.entity;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.Instant;

@Table("user_feed")
@Data
@Builder
@ToString
public class UserFeed {

    @PrimaryKey private UserFeedKey key;
    private Instant createdAt;
}
