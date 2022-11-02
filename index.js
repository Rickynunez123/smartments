const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config');
const Joi = require('joi'); 
//Creating APIs doc
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");




if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined. ');
    process.exit(1); //exit in case of an error 
}


/*  Connect to mongo db accesing smartments database */
mongoose.connect('mongodb+srv://rnunezcu123:Tsonga12345@smartments.cldqt31.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

//APIs documentation
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Smartments API",
            version: "1.0.0",
            description: "An API fot Smartments"
        },
        servers: [
            {
                url: "https://obscure-ridge-22477.herokuapp.com"
                // url: "http://localhost.com:3000" //testing put this in the url http://localhost:3000/api-docs/
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);


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

app.use(cors());
app.use(express.json());          //req.body
app.use('/api/smartments/tenants', tenants);
app.use('/api/smartments/building', buildings);
app.use('/api/smartments/apartments', apartments);
app.use('/api/smartments/landlord', landlord);
app.use('/api/smartments/rental', rental);
app.use('/api/smartments/users', users);
app.use('/api/smartments/auth', auth);



//apis
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening in port ${port}...`));

