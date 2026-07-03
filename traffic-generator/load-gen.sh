#!/usr/bin/env bash

# ./traffic-gen.sh www.google.com 2

#set -euo pipefail

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <url> <concurrency> <duration-in-seconds>"
    exit 1
fi

URL=$1 # Extract the position argument 1
CONCURRENCY="${2:-50}" # Extract the position argument 2, if not present use default.
DURATION_SECONDS="${3:-300}" # Extract the position argument 3, if not present use default.

echo "Generating load against: $URL"
echo "Concurrency: $CONCURRENCY"
echo "Duration: ${DURATION_SECONDS}s"
echo

end_time=$((SECONDS + DURATION_SECONDS))

worker() {
  while [ "$SECONDS" -lt "$end_time" ]; do
    curl -s -o /dev/null "$URL" || true
  done
}

for i in $(seq 1 "$CONCURRENCY"); do
  worker &
done

while [ "$SECONDS" -lt "$end_time" ]; do
  echo "Load Generator Running... $(date)"
  sleep 10
done

wait
echo "Load test complete."