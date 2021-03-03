REACT_APP_API_PROTOCOL=https REACT_APP_API_URL=webhooklogs.com/api REACT_APP_WS_PROTOCOL=wss yarn --cwd=web build
docker build -t dokku/webhooklogsapi:latest .
docker save dokku/webhooklogsapi:latest | bzip2 | ssh root@159.89.212.153 "bunzip2 | docker load" 
ssh root@159.89.212.153 "dokku tags:deploy webhooklogsapi latest"