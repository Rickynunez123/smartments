const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


const rentalSchema = new mongoose.Schema({
    building: {
        type: new mongoose.Schema({
            buildingName: String,
            buildingAddress: String,
            numberOfApartments: Number,
            apartmentsAvailable: {
                type: Number,
                requires: true,
                min: 0,
                max: 30},
        }),
        required: true
    },
    tenant: {
        type: new mongoose.Schema({
            name: String,
            lastName: String,
            phone: Number
        }),
        required: true
    },
    landlord: {
        type: new mongoose.Schema({
            name: String,
            lastName: String,
            phone: Number
        }),
        required: true 
    },
    apartment: {
        type: new mongoose.Schema({
            apartmentNumber: Number,
            monthlyRent: Number,
            securityDeposit: Number
        }),
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
        tenantId: Joi.string().required(),
        landlordId: Joi.string().required(),
        apartmentId: Joi.string().required()

    });

    return schema.validate(rental)
}

exports.Rental = Rental;
exports.validateRental = validateRental;