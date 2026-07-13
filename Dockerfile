FROM eclipse-temurin:25-alpine

ENV TZ="Europe/Paris"
ENV AUTOUPDATE=true
ENV ANOTHERTIME_AWTRIX_TOPIC=awtrix_xxxxxx
ENV ANOTHERTIME_AWTRIX_URL=http://awtrix_ip_address
ENV ANOTHERTIME_BROKER_URL=tcp://mqtt_address:1883

RUN apk --no-cache add bash

COPY ./assets/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# necessite gradlew bootJar
COPY build/libs/*.jar /opt/anothertime/anothertime.jar

VOLUME /data
WORKDIR /data
EXPOSE 8080

ENTRYPOINT [ "/entrypoint.sh" ]
