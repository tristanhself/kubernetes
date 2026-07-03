Baseline: 39.5s
inventory-api:baseline   8a28c633dcf6       1.76GB          457MB

ts20@ts20test1:~/dockerfile-optimization/starter$ docker history inventory-api:baseline 
IMAGE          CREATED         CREATED BY                                      SIZE      COMMENT
8a28c633dcf6   7 minutes ago   CMD ["python" "app.py"]                         0B        buildkit.dockerfile.v0
<missing>      7 minutes ago   ENV SECRET_KEY=supersecretkey123                0B        buildkit.dockerfile.v0
<missing>      7 minutes ago   ENV DEBUG=true                                  0B        buildkit.dockerfile.v0
<missing>      7 minutes ago   ENV FLASK_ENV=development                       0B        buildkit.dockerfile.v0
<missing>      7 minutes ago   EXPOSE [5000/tcp]                               0B        buildkit.dockerfile.v0
<missing>      7 minutes ago   RUN /bin/sh -c pip install -r requirements.t…   28.4MB    buildkit.dockerfile.v0
<missing>      7 minutes ago   COPY . . # buildkit                             20.5kB    buildkit.dockerfile.v0
<missing>      7 minutes ago   WORKDIR /app                                    8.19kB    buildkit.dockerfile.v0
<missing>      7 minutes ago   RUN /bin/sh -c apt-get update && apt-get ins…   74.4MB    buildkit.dockerfile.v0
<missing>      2 days ago      CMD ["python3"]                                 0B        buildkit.dockerfile.v0
<missing>      2 days ago      RUN /bin/sh -c set -eux;  for src in idle3 p…   16.4kB    buildkit.dockerfile.v0
<missing>      2 days ago      RUN /bin/sh -c set -eux;   savedAptMark="$(a…   82.8MB    buildkit.dockerfile.v0
<missing>      2 days ago      ENV PYTHON_SHA256=143b1dddefaec3bd2e21e3b839…   0B        buildkit.dockerfile.v0
<missing>      2 days ago      ENV PYTHON_VERSION=3.14.6                       0B        buildkit.dockerfile.v0
<missing>      2 days ago      RUN /bin/sh -c set -eux;  apt-get update;  a…   19.8MB    buildkit.dockerfile.v0
<missing>      2 days ago      ENV PATH=/usr/local/bin:/usr/local/sbin:/usr…   0B        buildkit.dockerfile.v0
<missing>      2 days ago      RUN /bin/sh -c set -ex;  apt-get update;  ap…   694MB     buildkit.dockerfile.v0
<missing>      2 days ago      RUN /bin/sh -c set -eux;  apt-get update;  a…   202MB     buildkit.dockerfile.v0
<missing>      2 days ago      RUN /bin/sh -c set -eux;  apt-get update;  a…   65MB      buildkit.dockerfile.v0
<missing>      3 days ago      # debian.sh --arch 'amd64' out/ 'trixie' '@1…   134MB     debuerreotype 0.17

Optimized: 14.6 seconds
IMAGE                     ID             DISK USAGE   CONTENT SIZE   EXTRA
inventory-api:optimized 8dc757415b33        226MB         55.4MB   

ts20@ts20test1:~/dockerfile-optimization/starter$ docker history inventory-api:optimized
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
8dc757415b33   48 seconds ago   CMD ["gunicorn" "--bind" "0.0.0.0:5000" "app…   0B        buildkit.dockerfile.v0
<missing>      48 seconds ago   HEALTHCHECK &{["CMD-SHELL" "curl -f http://l…   0B        buildkit.dockerfile.v0
<missing>      48 seconds ago   USER appuser                                    0B        buildkit.dockerfile.v0
<missing>      48 seconds ago   RUN /bin/sh -c addgroup --system appuser && …   45.1kB    buildkit.dockerfile.v0
<missing>      48 seconds ago   EXPOSE [5000/tcp]                               0B        buildkit.dockerfile.v0
<missing>      49 seconds ago   COPY . . # buildkit                             24.6kB    buildkit.dockerfile.v0
<missing>      49 seconds ago   RUN /bin/sh -c pip install --no-cache-dir -r…   23.1MB    buildkit.dockerfile.v0
<missing>      52 seconds ago   COPY requirements.txt . # buildkit              12.3kB    buildkit.dockerfile.v0
<missing>      52 seconds ago   WORKDIR /app                                    8.19kB    buildkit.dockerfile.v0
<missing>      52 seconds ago   RUN /bin/sh -c apt-get update && apt-get ins…   13.5MB    buildkit.dockerfile.v0
<missing>      2 days ago       CMD ["python3"]                                 0B        buildkit.dockerfile.v0
<missing>      2 days ago       RUN /bin/sh -c set -eux;  for src in idle3 p…   16.4kB    buildkit.dockerfile.v0
<missing>      2 days ago       RUN /bin/sh -c set -eux;   savedAptMark="$(a…   41.3MB    buildkit.dockerfile.v0
<missing>      2 days ago       ENV PYTHON_SHA256=c08bc65a81971c1dd578318282…   0B        buildkit.dockerfile.v0
<missing>      2 days ago       ENV PYTHON_VERSION=3.12.13                      0B        buildkit.dockerfile.v0
<missing>      2 days ago       ENV GPG_KEY=7169605F62C751356D054A26A821E680…   0B        buildkit.dockerfile.v0
<missing>      2 days ago       RUN /bin/sh -c set -eux;  apt-get update;  a…   4.94MB    buildkit.dockerfile.v0
<missing>      2 days ago       ENV LANG=C.UTF-8                                0B        buildkit.dockerfile.v0
<missing>      2 days ago       ENV PATH=/usr/local/bin:/usr/local/sbin:/usr…   0B        buildkit.dockerfile.v0
<missing>      3 days ago       # debian.sh --arch 'amd64' out/ 'trixie' '@1…   87.4MB    debuerreotype 0.17