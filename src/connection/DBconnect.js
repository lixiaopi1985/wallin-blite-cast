const mongoose = require('mongoose');
const assert = require('assert');
const chalk = require('chalk');

const PORT = 27017;
const DBNAME = 'AgrimetWeather';
const PASSWORD = 'Lxp3961881';
const URL = `mongodb+srv://xpingli:${PASSWORD}@officialweather-vral8.mongodb.net/${DBNAME}?retryWrites=true&w=majority` || `mongodb://127.0.0.1:${PORT}/${DBNAME}`;



mongoose.connect(URL, {
    useNewUrlParser: true
}, (err, client)=>{
    assert.equal(null, err);
    console.log(chalk.green.inverse('Connected to the database server successfully'));
})


