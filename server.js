//CONFIG DOTENV ASAP
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// console.log(process.env);

//DATABASE
const mongoose = require("mongoose");
let URI = process.env.DATABASE_CONNECTIONSTRING;
URI = URI.replace("<DATABASE_USERNAME>", process.env.DATABASE_USERNAME)
  .replace("<DATABASE_PASSWORD>", process.env.DATABASE_PASSWORD)
  .replace("<DATABASE_NAME>", process.env.DATABASE_NAME);
mongoose.connect(URI).then(() => {
  console.log("DB connection successful)");
});

//IMPORT APP and RUN!
const app = require("./app");
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
