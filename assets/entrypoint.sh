#!/usr/bin/env bash

CURRENT_VERSION=0

if [[ -f anothertime.jar ]]; then
  CURRENT_VERSION=$(unzip -q -p anothertime.jar META-INF/MANIFEST.MF | awk -F' ' '/Implementation-Version/ {print $2}')
fi

LAST_VERSION=$(lastversion --at github toinux/anothertime -gt "${CURRENT_VERSION}")

if [[ $? -eq 0 ]]; then
  echo "Updating anothertime to $LAST_VERSION"
  lastversion --assets --at github toinux/anothertime -gt "${CURRENT_VERSION}" -o anothertime.jar
else
  echo "Anothertime already to latest version : ${CURRENT_VERSION}"
fi

java -jar anothertime.jar