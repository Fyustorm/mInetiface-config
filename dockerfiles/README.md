# Server build
docker build -f .\dockerfiles\nginx.Dockerfile -t fyustorm/minetiface .
docker save -o minetiface-image fyustorm/minetiface

sudo docker image load < minetiface-image
sudo docker compose up --force-recreate -d

# Build tauri


# Gist tauri
https://gist.githubusercontent.com/Fyustorm/9ed4aec29db555435001957d8f200135