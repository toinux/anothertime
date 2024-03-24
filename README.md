# Anothertime
[![Gradle Package](https://github.com/toinux/anothertime/actions/workflows/gradle-release.yml/badge.svg)](https://github.com/toinux/anothertime/actions/workflows/gradle-release.yml)

Anothertime is a highly customizable clock for [Awtrix 3](https://github.com/Blueforcer/awtrix3)

![Anothertime](/anothertime.gif)

# Run with docker

Example of `docker-compose.yml`
```yaml
version: '2.1'
services:
    anothertime:
        image: toinux/anothertime:latest
        container_name: anothertime
        restart: unless-stopped
        # Default port is 8080, to change it to 7000 put "7000:8080" 
        ports:
          - "8080:8080"
        # Environment variables can be also defined in anothertime.yaml instead
        environment:
          - ANOTHERTIME_AWTRIX_TOPIC=awtrix                # awtrix MQTT prefix
          - ANOTHERTIME_AWTRIX_URL=http://192.168.1.1      # awtrix URL
          - ANOTHERTIME_BROKER_URL=tcp://192.168.1.2:1883  # MQTT URL
          - ANOTHERTIME_BROKER_USERNAME=login              # MQTT login, remove this var if no login
          - ANOTHERTIME_BROKER_PASSWORD=password           # MQTT password, remove this var if no password
          - TZ=Europe/Paris                                # Change your timezone (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
          - AUTOUPDATE=true                                # Anothertime will use latest release on restart if true
        volumes:
          - /home/your/location:/data                      # Settings will be saved in this directory. 
```

If `AUTOUPDATE=false`, place manually `anothertime.jar` in the settings directory

The web interface is accessible on default port 8080. 


# Customization

## Configuration file

Put a file named `anothertime.yaml` in your settings directory (this is the /data volume exposed by docker).
Environement variables have precedence over `anothertime.yaml`.

Example :

```yaml
anothertime:
  broker-url: tcp://192.168.1.2:1883
  broker-username: login
  broker-password: password
  awtrix-url: http://192.168.1.1
  awtrix-topic: awtrix
  pause-if-hidden: false              # true to stop sending to MQTT while app is not displayed
```

## Sensor
Humidity and temperature are read by default from `<awtrix_topic>/stats` MQTT topic, but it's possible to read these values from another MQTT topic :

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