cd ./insta-discovery 
./run.sh &
cd ../auth-service 
./run.sh &
cd ../insta-api-gateway
./run.sh &
cd ../insta-media-service
./run.sh &
cd ../insta-post-service
./run.sh &
cd ../insta-graph-service
./run.sh &
cd ../insta-feed-service
./run.sh
