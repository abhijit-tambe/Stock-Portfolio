# Stock-Portfolio

Main server is inside server folder

clone the folder and run npm intall

run npm start to start the server running.

API routes available

'/' its  base testing route entry point
'/api/user' entry route for user login and retriving user details
'/api/dashboard' main page after user is authenticated is redirected here
'/api/portfolio' portfolio routes to delete create and add stocks to portfolio
'/api/stocks' it calls external stock api to get all current stock market json data

it is connected to mongodb to keep the users, dashboard data.
 
