#!/usr/bin/env bash

set -o pipefail

EMBEDDED_JAR="/opt/anothertime/anothertime.jar"

if [[ -f anothertime.jar ]]; then
  echo "using anothertime.jar found in /data instead of embedded jar"
  JAR_TO_RUN="anothertime.jar"
else
  echo "anothertime.jar not found in /data, using embedded jar"
  JAR_TO_RUN="${EMBEDDED_JAR}"
fi

java -jar "${JAR_TO_RUN}"