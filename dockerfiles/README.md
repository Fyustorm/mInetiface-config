# Server build
docker build -f .\dockerfiles\nginx.Dockerfile -t cyber-kitty/minetiface .
docker save -o minetiface-image cyber-kitty/minetiface

sudo docker image load < minetiface-image
sudo docker compose up --force-recreate -d

# Build tauri


# Gist tauri
https://gist.githubusercontent.com/Cyber-Kitty/2c65fc1f0ef885578c4ccb57ca6e67f8