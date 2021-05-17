if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;

const app = express();

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('./assets'));

//configuring MongoDb
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

// use express router which is a middleware
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('Error in running express server');
    }
    console.log('Yup! Express server is up on port:', port);
});
