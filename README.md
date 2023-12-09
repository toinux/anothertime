# anothertime

# Sensor
Humidity and temperature are read by default from `<awtrix_topix>/stats` MQTT topic.

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
