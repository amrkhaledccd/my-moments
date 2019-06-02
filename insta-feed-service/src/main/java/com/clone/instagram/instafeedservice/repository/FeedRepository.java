package com.clone.instagram.instafeedservice.repository;

import com.clone.instagram.instafeedservice.entity.UserFeed;
import org.springframework.data.cassandra.repository.CassandraRepository;

public interface FeedRepository extends CassandraRepository<UserFeed, String> {
}
