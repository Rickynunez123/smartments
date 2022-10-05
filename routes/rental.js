const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

/*  check how to accces the  destination patH  */
const rentalSchema = new mongoose.Schema({
    name: String,
    dateStarted: {type: Date, default: Date.now},
    deposit: Number
});

const Rent = mongoose.model('Rent', rentalSchema);

async function createRent(){
    const rent = new Rent({
        name: 'First payment',
        deposit: 100
    });
    //saving document 
    const result = await rent.save();
    console.log(result);
    }
    createRent();


    //add all the routes here 
    


