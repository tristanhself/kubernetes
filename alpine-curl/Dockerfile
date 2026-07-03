FROM alpine:latest

RUN apk add --no-cache curl

# Mandated, must run, can't be overridden.
ENTRYPOINT [ "curl" ]

# Optional, will run this unless overridden by the user.
CMD [ "localhost"]