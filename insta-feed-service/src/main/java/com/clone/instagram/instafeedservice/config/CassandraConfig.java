package com.clone.instagram.instafeedservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
import org.springframework.data.cassandra.config.CassandraClusterFactoryBean;
import org.springframework.data.cassandra.config.SchemaAction;
import org.springframework.data.cassandra.core.cql.keyspace.CreateKeyspaceSpecification;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableCassandraRepositories(basePackages = "com.clone.instagram.instafeedservice.repository")
public class CassandraConfig extends AbstractCassandraConfiguration {

    @Value("${spring.data.cassandra.keyspaceName}")
    private String keyspace;

    @Value("${spring.data.cassandra.contactPoints}")
    private String contactPoints;

    @Value("${spring.data.cassandra.port}")
    private int port;


    @Bean
    public CassandraClusterFactoryBean cluster() {
        CassandraClusterFactoryBean cluster = new CassandraClusterFactoryBean();
        cluster.setContactPoints(contactPoints);
        cluster.setPort(port);
        return cluster;
    }

    @Override
    public SchemaAction getSchemaAction() {
        return SchemaAction.CREATE_IF_NOT_EXISTS;
    }

    @Override
    protected List getKeyspaceCreations() {
        CreateKeyspaceSpecification specification = CreateKeyspaceSpecification.
                createKeyspace(keyspace).ifNotExists();

        return Arrays.asList(specification);
    }

    @Override
    protected String getKeyspaceName() {
        return keyspace;
    }

    @Override
    public String[] getEntityBasePackages() {
        return new String[]{"com.clone.instagram.instafeedservice.entity"};
    }

}
