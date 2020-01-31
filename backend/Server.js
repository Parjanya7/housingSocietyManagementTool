const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();

mongoose.connect( 'mongodb://localhost:27017/housingSociety', err => {

    if( err ) 
        console.log( err );
    else 
        console.log("DataBase Connected..");
});

config.MiddleWare(app, express, bodyParser);
config.ROUTES(app);

app.get('/current', ( req, res) => console.log(__dirname));

app.listen( config.PORT, ()=> console.log(`Server Running on PORT: ${config.PORT}`) );
