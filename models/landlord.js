const mongoose = require('mongoose');
const Joi = require('joi');
const { userSchema } = require('./user');

mongoose.connect('mongodb+srv://rnunezcu123:Tsonga12345@smartments.cldqt31.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const landlordSchema = new mongoose.Schema({
    phone: String,
    pictureOfID: Boolean,//cahnge to an actual picture later 
    user: {
        type: userSchema,
        required: true
    }
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
        phone: Joi.string(),
        pictureOfID: Joi.boolean().required(),
        userId: Joi.string().required()
    });
    return schema.validate(landlord);
}

exports.Landlord = Landlord;
exports.validateLandlord = validateLandlord;
exports.landlordSchema = landlordSchema;