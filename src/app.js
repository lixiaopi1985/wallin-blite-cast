const express = require('express');
const path = require('path');
const hbs = require('hbs');
const helmet = require('helmet');
const mainAppRouter = require('./routers/mainAppRouter');
const form1Router = require('./routers/form1Router');
const form2Router = require('./routers/form2Router');
const errorRouter = require('./routers/notFoundRouter');
const downloadRouter = require('./routers/downloads');




const app = express();
app.use(helmet());

const port = process.env.PORT || 3000;

const publicDiretoryPath = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../templates/views/');
const partialPath = path.join(__dirname, '../templates/partials/');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// set up statisic files url
app.use(express.static(publicDiretoryPath));
app.use(express.json());
app.use(express.urlencoded());
// allow cross origin
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


app.use('/', mainAppRouter);
app.use('/', form1Router);
app.use('/', form2Router);
app.use('/', downloadRouter);
app.use('*', errorRouter);

    


app.listen(port, ()=>{
    console.log("Server is listening on port: ", port);
})


