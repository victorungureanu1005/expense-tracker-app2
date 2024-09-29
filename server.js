//CONFIG DOTENV ASAP
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
// console.log(process.env);


//IMPORT APP
const app = require('./app');
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on ${port}`);
})