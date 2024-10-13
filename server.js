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
    console.log();
  }
});

const userRouter = require("./routes/user");
app.use("/user", userRouter);
app.listen(4000, "0.0.0.0", () => {
  console.log("Server is running on port 4000");
});
