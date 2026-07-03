# Stop and remove containers

export DB_CONTAINER_NAME="mongodb"

source .env.db
source .env.volume
source .env.network

# Container
if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    docker kill $DB_CONTAINER_NAME # && docker rm $DB_CONTAINER_NAME - Add if not running with "docker run -rm..."
    echo "Container: $DB_CONTAINER_NAME deleted."
else
    echo "Container: $DB_CONTAINER_NAME does not exist, skipping deletion."
fi

# Storage
if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    docker volume rm $VOLUME_NAME
    echo "Volume: $VOLUME_NAME deleted."
else
    echo "Volume: $VOLUME_NAME does not exist, skipping deletion."
fi

# Network
if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    docker network rm $NETWORK_NAME
    echo "Network: $NETWORK_NAME deleted."
else
    echo "Network: $NETWORK_NAME does not exist, skipping deletion."   
fi