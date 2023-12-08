#!/usr/bin/env bash

set -o pipefail

AUTOUPDATE=${AUTOUPDATE:-true}

CURRENT_VERSION=0
GITHUB_REPO="toinux/anothertime"
GITHUB_URL="https://github.com/${GITHUB_REPO}"


if [[ -f anothertime.jar ]]; then
  if ! CURRENT_VERSION=$(unzip -q -p anothertime.jar META-INF/MANIFEST.MF | awk -F' ' '/Implementation-Version/ {print $2}'); then
    CURRENT_VERSION=0
  fi
fi

if [[ "${CURRENT_VERSION}" = 0 ]] ; then
  echo "anothertime.jar not found, fetching last version on ${GITHUB_URL}"
  lastversion --assets --at github "${GITHUB_REPO}" -gt "${CURRENT_VERSION}" -o anothertime.jar
elif [[ "${AUTOUPDATE}" = true ]] ; then
  echo "AUTOUPDATE=true, checking last version on ${GITHUB_URL}"
  if LAST_VERSION=$(lastversion --at github "${GITHUB_REPO}" -gt "${CURRENT_VERSION}"); then
    echo "New version found, updating to $LAST_VERSION"
    lastversion --assets --at github "${GITHUB_REPO}" -gt "${CURRENT_VERSION}" -o anothertime.jar
  else
    echo "anothertime.jar already to latest version : ${CURRENT_VERSION}"
  fi
fi
java -jar anothertime.jar