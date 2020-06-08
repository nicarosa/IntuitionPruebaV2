const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database');


//routes import
const indexRoutes = require('./routes/index');

//middleware
app.use(morgan('dev'));
app.use(express.json());

//Static
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/api/encuesta',require('./routes/index'));

//server start
app.listen(5000, () => {
console.log('Server on port 5000');
});