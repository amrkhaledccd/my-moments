FROM openjdk:10-jre-slim

LABEL maintainer="amrkhaledccd@hotmail.com"
VOLUME /tmp

EXPOSE 8080

ARG JAR_FILE=target/auth-service-0.0.1-SNAPSHOT.jar

ADD ${JAR_FILE} app.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]