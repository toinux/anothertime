#!/usr/bin/env bash

set -o pipefail

EMBEDDED_JAR="/opt/anothertime/anothertime.jar"

if [[ ! -f anothertime.jar ]]; then
  echo "anothertime.jar not found in /data, using embedded jar"
  cp "${EMBEDDED_JAR}" anothertime.jar
fi

java -jar anothertime.jar