const express = require('express');
const morgan = require('morgan');

//SETTING UP APP
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//SETTING UP MORGAN
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server side 👋");
});









//EXPORT APP
module.exports = app;