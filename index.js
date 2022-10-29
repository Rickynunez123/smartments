const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config');
const Joi = require('joi');



if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined. ');
    process.exit(1); //exit in case of an error 
}


/*  Connect to mongo db accesing smartments database */
mongoose.connect('mongodb+srv://rnunezcu123:Tsonga12345@smartments.cldqt31.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


/*  importing  */
const tenants = require('./routes/tenants');
const buildings = require('./routes/building');
const apartments = require('./routes/apartments');
const landlord = require('./routes/landlord');
const rental = require('./routes/rental');
const users = require('./routes/users')
const auth = require('./routes/auth')

require('./startup/prod')(app);



//changes

//adding middleware 
app.use(express.json());          //req.body
app.use('/api/smartments/tenants', tenants);
app.use('/api/smartments/building', buildings);
app.use('/api/smartments/apartments', apartments);
app.use('/api/smartments/landlord', landlord);
app.use('/api/smartments/rental', rental);
app.use('/api/smartments/users', users);
app.use('/api/smartments/auth', auth);





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening in port ${port}...`));

