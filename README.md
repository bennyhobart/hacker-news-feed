#Hacker News Feed

##Running the APP
+ Install Dependencies
`npm install`
+ Get your hands on a mongo database ([mongolab](https://mongolab.com/))
+ Setup Environement variables
`export MONGO_URI=*point to mongod*`
+ Run App
`npm run main`

##File Structure
````
public/ - for public assets
views/ - for jade views to be rendered by express
posts.js - the posts model
index.js - contains mongo and express configuration/routing, also the entry point of the app
````

##Environment Variables
````
PORT - the port for express to listen on
    default: 3000
API_URL - the url for the api to get data from
    default: "http://hn.algolia.com/api/v1/search_by_date?query=nodejs"
MONGO_URI - the uri to connect to mongod over
    default: "mongodb://localhost/hacker-news-feed"
REFRESH_INTERVAL - the interval (in ms) at which the app fetches the API_URL for data
    default: 3600000 (1 hour)
````