FROM eclipse-temurin:21-jdk-alpine

ENV TZ="Europe/Paris"
ENV AUTOUPDATE=true
ENV ANOTHERTIME_AWTRIX_TOPIC=awtrix_xxxxxx
ENV ANOTHERTIME_AWTRIX_URL=http://awtrix_ip_address
ENV ANOTHERTIME_BROKER_URL=tcp://mqtt_address:1883

RUN apk --no-cache add py3-pip
RUN pip install lastversion

COPY ./assets/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

VOLUME /data
WORKDIR /data

ENTRYPOINT [ "/entrypoint.sh" ]
