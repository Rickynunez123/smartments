const mongoose = require('mongoose');
const Joi = require('joi');
const { buildingSchema } = require('./building');
const { userSchema } = require('./user');



mongoose.connect('mongodb+srv://rnunezcu123:Tsonga12345@smartments.cldqt31.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


const rentalSchema = new mongoose.Schema({
    user: {
        type: userSchema,
        required: true
    },
    building: {
        type: buildingSchema,
        required: true
    },
    contractStarted: { 
        type: Date, 
        required: true,
        default: Date.now
      },
      contractFinished: { 
        type: Date
      }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental){
    const schema = Joi.object({
        buildingId: Joi.string().required(),
        userId: Joi.string().required(),
        

    });

    return schema.validate(rental)
}

exports.Rental = Rental;
exports.validateRental = validateRental;