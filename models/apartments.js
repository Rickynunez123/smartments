const mongoose = require('mongoose');
const Joi = require('joi');


mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const apartmentSchema = new mongoose.Schema({
    apartmentNumber: Number,
    monthlyRent: Number,
    securityDeposit: Number, 
    tenatsInApartment: {
        type: Number,
        min: 1,
        max: 8
    }
})

const Apartment = mongoose.model('Apartment', apartmentSchema);

async function getApartment(){
    return await Apartment
    .find()
    .select({apartmentNumber:1, monthlyRent: 1, securityDeposit: 1, tenatsInApartment:1 })
}

/*  print  */
async function run(){
    const apartment = await getApartment();
    console.log(apartment);
}


async function createApartment(){
    const apartment = new Apartment({
        apartmentNumber: 1,
        monthlyRent: 300,
        securityDeposit: 300,
        tenatsInApartment: 2
    });
try{
    const result = await apartment.save();
    console.log(result);
}

    catch (ex) {
        console.log(ex.message);
}
}

// createApartment();
// run();

function validateApartment(apartment){
    const schema = Joi.object({
        apartmentNumber: Joi.number().required,
        monthlyRent: Joi.number().min(40).required,
        securityDeposit: Joi.number().min(40).required(),
        tenatsInApartment: Joi.number().min(1).required()

    });

    //input validation using joi
    return schema.validate(apartment);
}

exports.Apartment = Apartment;
exports.apartmentSchema = apartmentSchema;
exports.validateApartment = validateApartment;


