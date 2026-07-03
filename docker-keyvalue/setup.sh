# Create Volumes and Networks

source .env.network
source .env.volume

# Storage
if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Volume: $VOLUME_NAME already exists."
else
    docker volume create $VOLUME_NAME
    echo "Volume: $VOLUME_NAME created."
fi

# Network
if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Network: $NETWORK_NAME already exists."
else
    docker network create $NETWORK_NAME
    echo "Network: $NETWORK_NAME created."
fi