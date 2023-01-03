# Icar
Icar is a rental car admin panel that shows the real time locations of rental cars.

## System Design
The system consists of a producer service that converts mock location data from a CSV into real-time location data, which is then periodically sent to a message broker.
A bridge consumes the message broker's messages and saves them to a database.
The backend is a RESTful API that returns the latest location for each vehicle everytime it is requested by the frontend.

## Tech stack

- Orchestration - Docker + Docker compose
- Producer - Golang
- Message broker - RabbitMQ
- Bridge - JavaScript
- Backend - Express.js, JWT auth
- Frontend - React.js (functional components + hooks), Typescript

![image](https://user-images.githubusercontent.com/53450844/210411224-c9a11859-f597-432e-a3fd-795ae41a9508.png)



## TODO
- Integrate websockets to update locations without refreshing
- Change normal mongodb to a timeseries mongodb database
