# Installation needs to be done

1. - `npm init -y` initialise project
- `touch index.js` create a index file
2. - Install all requred modules- npm i express nodemon mongoose bcrypt cors dotenv jsonwebtoken

 3.  --> in package.json -- write inside scripts --> `"server":"nodemon index.js"`

 4. We have to create the folder structure like ->
 config -> for configuration 
 middlewares -> for validators or custom middlewares
 models -> schema for mongo db
 routes -> to create specific routes for different path
 index.js to import all other routes and create connection with the server

 5. inside config -> create file db.js 
     middleware   -> create validator.middleware.js 
     models -> for different routes , different models ->
      user.model.js , admin.model.js , cart.model.js
       routes -> for different routes , different models ->
      user.route.js , admin.route.js , cart.route.js

 6. then write all the logic inside the index.js file to connect with databae 
    youtube video --> how to install mongo db 6.0.0 --> 
    go to env variable files and paste the bin path of the mongosh app and create a data folder with db file inside it 
    go to services open the mongo db server and then go to mongo sh and type mongod and boom server is open or in cmd promt we can type mongosh as well 

7. boom we are now connected to database with a localhost of mongo db

8. now create models --> const mongoose = require("mongoose")  
   then schema ==
   cnst userscchema=mongoose.Schema({
    name:  String ,
     email:  String  ,
     pass :  String 
   })

   cnst userModel = mongoose.model("user",userSchemar)

   module.export={userMidel}
 
- localhost:6797/products?price=30,60

- localhost:6797/products?price=30,200&page=4

- localhost:6797/products?sort=price&orderBy=asc&limit=100&brand=Colgate

-. Why we use app.use(express.json()) ? 
 In a Node.js and Express.js application, the app.use(express.json()) middleware is used to parse incoming requests with JSON payloads.

When a client sends a request to the server with a JSON payload, such as in the body of a POST or PUT request, the express.json() middleware parses the JSON data and makes it available on the request.body property for further processing in your route handlers.

Without using express.json(), the server would not automatically parse the JSON data, and you would need to manually parse it yourself using additional code.

    deployed mongo db link --> 
     https://chocolate-shark-wear.cyclic.app/


{
    "image":"img.jpg",
    "title":"Shirt",
    "mrp":123,
    "price":100,
    "category":"Male",
    "rating":5,
    "review":5
}

{
    "name":"Md Ali",
    "email":"ali@gmail.com",
    "password":"12345",
    "role":"admin"
}


  --> ** we need to write "Authorization" inside headers and in the value write the token for post request

  to connect to mongodb atlas database use mongosh and mnngodbatlas url to connect and use the query like local mongo db by adding s in the last of collection names 

  



- 