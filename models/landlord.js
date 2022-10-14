const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const landlordSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: String,
    userName: String,
    phone: Number
});

const Landlord = mongoose.model('Landlord', landlordSchema);

async function createLandlord(){
    const landlord = new Landlord({
        name: 'Mario',
        lastName: 'Nunez',
        userName: 'marionu',
        phone: 9099090494
    });
    try{
        const result = await landlord.save();
        console.log(result);
    }
    catch(ex){
        console.log(ex.message)
    }
}

// createLandlord();

function validateLandlord(landlord){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        userName: Joi.string().min(3).required(),
        phone: Joi.number()
    });
    return schema.validate(landlord);
}

exports.Landlord = Landlord;
exports.validateLandlord = validateLandlord;
exports.landlordSchema = landlordSchema;