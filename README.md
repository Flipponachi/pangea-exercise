# Subscription System

This application seeks to mock a pub/sub system by notifying subscribers when a message gets to it.
A Topic is any string and a subscriber is a valid HTTP URL.
When a message is published on a topic, it's  forwarded to all subscriber endpoints supplied during the subscription.<br><br>

Tech Stack
- Docker
- Typescript
- MongoDB
- NodeJs/Express


A simple way to run this application is by using docker image provided on the docker hub as flipponachi/pangea-subscriber and flipponachi/pangea-publisher. To run the pangea-subscriber app, an environment variable which can be supplied as `-e MONGO_ADDRESS=mongodb://localhost:27018/some-collection-name` is needed for the mongodb instance o as to persist data. You can also run this application by using the command `npm install` to install all packages and then `npm run start:dev` for both application to run the app. Supply the valid mongodb connection as made available in the env example file for the pangea.publiher app.<br><br>

To subscribe, send a POST request the publisher at route '/subscribe/{topic} where the Topic is any string. The body of the request takes one `url` parameter that is the URL of the endpoint that future pulish messages should be sent to.<br>
To publish, send a POST request to '/publish/{topic} and the payload can be any valid JSON object is to be broadcast.
<br><br>
There are sample bash scripts to help with the demo.  <br>
Once the servers are running, `sample.sh` makes sample CURL calls to the servers, to both subscribe to a topic and publish from it. <br><br>
NOTE: Remember to run `docker-compose down` if using docker-compose setup. 
<br><br>
