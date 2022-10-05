const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();


/*  Connect to mongo db accesing smartments database */
mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


/*  importing  */
const courses = require('./routes/courses'); 

const tenants = require('./routes/tenants');
// const buildings = require('./routes/building');
// const rental = require('./routes/rental');
// const { use } = require('./routes/courses');




//adding middleware 
app.use(express.json());          //req.body
app.use('/api/courses', courses); //for any route that starts like /api/courses use courses


//adding middleware for smartment
app.use('/api/smartments/tenants', tenants);
// app.use('/api/smartments/building', building);
// app.use('/api/smartments/rental', rental);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening in port ${port}...`));

//this is a comment 