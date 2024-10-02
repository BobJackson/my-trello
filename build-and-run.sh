git pull
docker stop trello-ui
docker rm trello-ui
docker build -t trello-ui .
docker run -d -p 10083:80 --restart always --name trello-ui --network www_wordpress-network trello-ui