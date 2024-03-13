# anothertime
[![Gradle Package](https://github.com/toinux/anothertime/actions/workflows/gradle-release.yml/badge.svg)](https://github.com/toinux/anothertime/actions/workflows/gradle-release.yml)

# Run with docker

Example of `docker-compose.yml`
```yaml
version: '2.1'
services:
    anothertime:
        image: toinux/anothertime:latest
        container_name: anothertime
        restart: unless-stopped
        environment:
          - ANOTHERTIME_AWTRIX_TOPIC=awtrix                # awtrix MQTT prefix
          - ANOTHERTIME_AWTRIX_URL=http://192.168.1.1      # awtrix URL
          - ANOTHERTIME_BROKER_URL=tcp://192.168.1.2:1883  # MQTT URL
          - ANOTHERTIME_BROKER_USERNAME=login              # MQTT login, remove this var if no login
          - ANOTHERTIME_BROKER_PASSWORD=password           # MQTT password, remove this var if no password
        volumes:
          - /home/your/location:/data                      # put your customized anothertime.yaml here
```

# Sensor
Humidity and temperature are read by default from `<awtrix_topic>/stats` MQTT topic.

It's possible to read these values from another MQTT topic :

```yaml
# case when temperature and humidity are in a json object in the same topic
# in this case, 'temperature:' and 'humidity:' attributes are considered as JsonPath
# cf. https://github.com/json-path/JsonPath
anothertime:
  sensor-type: mqtt # default value is 'awtrix'
  mqtt-sensor:
    topic: sensor/topic
    temperature: $.temperature
    humidity: $.humidity
```

```yaml
# case when temperature and humidity are directly read from a specific topic
# note in this case the absence of the 'topic:' attribute
anothertime:
  sensor-type: mqtt # default value is 'awtrix'
  mqtt-sensor:
    temperature: sensor/topic/temperature
    humidity: sensor/topic/humidity
```
