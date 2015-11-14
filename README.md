#Hacker News Feed

##Running the APP
````
node index.js
````

##File Structure
````
public/ - for public assets
views/ - for jade views to be rendered by express
posts.js - the posts Model
index.js - contains mongo and express configuration/routing, also the entry point of the app
````

##ENV
````
PORT - the port for express to listen on
    default: 3000
API_URL - the url for the api to get data from
    default: "http://hn.algolia.com/api/v1/search_by_date?query=nodejs"
MONGO_URI - the uri to connect to mongod over
    default: "mongodb://localhost/hacker-news-feed"
````