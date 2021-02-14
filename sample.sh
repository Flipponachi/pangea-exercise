curl -X POST -H "Content-Type: application/json" -d '{ "url": "http://localhost:9000/"}' http://localhost:9000/subscribe/fashion 
echo "\n"
curl -X POST -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:4000/publish/faashion