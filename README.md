# Take Home Test by TIER Mobility 
A custom url shortener application. This application uses machine counter of mongodb id as a short url identifier.
## Live demo
* **Swagger**

  You should be able to browse swagger documentation of all APIs at below given url
    ```
    https://tier-mobility-task.herokuapp.com/api-docs
    ```
## Getting Started
Download the code from repository and follow below given instructions.

### Installing
Before we run the solution, go to the local respository or downloaded folder (using cd command) and install node_modules by running:
```
npm install
```

### Running

```
npm start
```

## Verify Uniqueness of short urls
Feel free to run stress test to generate short urls to simulate concurrent users. Once stress test done, get the count of duplicate entries via ```/short/duplicates``` endpoint.

I have verified the uniqueness via stress testing. Here are the details of load:
1. Requests per second: 200
2. Duration: 5 mins
## Built With

* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com)
* [MongoDB](https://www.mongodb.com/)
* [Heroku](http://heroku.com/)
## Authors
* **Muqadar Ali Jamali**
