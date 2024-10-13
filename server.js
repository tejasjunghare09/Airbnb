const express = require("express");
const cors = require("cors"); //allow user for different oragin
const jwt = require("jsonwebtoken");
const config = require("./config");
const utils = require("./utils");

const app = express();

app.use(cors());
/*this line enables JSON parsing for incoming requests.
This mid
*/
app.use(express.json());

app.use((request, response, next) => {
  //check if token
  if (
    request.url === "/user/login" ||
    request.url === "/user/register" ||
    request.url.startsWith === "/image/"
  ) {
    next();
  } else {
    //get the token
    const authtoken= request.headers.authorization;
    const token = authtoken.split(" ")[1];
    console.log("$ ",token);
    // const token =request.headers['token']

    if(!token || token.length ===0){
      response.send(utils.createErrorResult('missing token'))
    } else{
      try{
        //verify the token
        const payload=jwt.verify(token,config.secret)

        //add the user Id to the request
        request.userId=payload['id']

        //TODO: expiry logic

        // call the real route

        next()
      }
      catch (ex){
        response.send(utils.createErrorResult('invalid token'))
      }
    }
  }
});

const userRouter = require("./routes/user");
const categoryRouter = require ("./routes/category")
const imageRouter =require ("./routes/image")
const propertyRouter = require('./routes/property')
const bookingRouter = require('./routes/booking')

app.use("/user", userRouter);
app.use('/category',categoryRouter)
app.use('/image', imageRouter)
app.use('/property',propertyRouter)
app.use('/booking',bookingRouter)

app.listen(4000, "0.0.0.0", () => {
  console.log("Server is running on port 4000");
});
