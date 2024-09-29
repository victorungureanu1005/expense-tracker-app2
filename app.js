const express = require("express");
const morgan = require("morgan");

//SETTING UP APP
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//MIDDLEWARE
//Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// //Additional Middleware
// app.use((req, res, next) => {
//   console.log("Hello from the middleware! 👌");
//   next();
// });

//INDEX Response - Test
app.get("/", (req, res) => {
  res.status(200).send("Hello from the server side 🖥️");
});


//ROUTING







//EXPORT APP
module.exports = app;

