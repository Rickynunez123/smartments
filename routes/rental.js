const {Rental, validateRental } = require('../models/rental');
const {Building, validateBuilding} = require('../models/building');
const {Apartment, validateApartment} = require('../models/apartments');
const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('contractStarted');
    res.send(rental);
});

router.post('/', async (req, res) => {
    const result = validateRental(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);


    const building = await Building.findById(req.body.buildingId);
    if(!building) return res.status(400).send('Invalid Building');

    const user = await User.findById(req.body.userId);
    if(!user) return res.status(400).send('Invalid user');




    let rental = new Rental({
        building: {
            buildingName : building.buildingName,
            buildingAddress: building.buildingAddress,
            numberOfApartments: building.numberOfApartments,
            apartmentsAvailable: building.apartmentsAvailable,
            user: {
            name: building.user.name,
            lastName: building.user.lastName,
            email: building.user.email,
            password: building.user.password,
            landlord: [ building.user.landlord ]},
            apartment: [
                {
                    apartmentNumber: building.apartment.apartmentNumber,
                    monthlyRent: building.apartment.monthlyRent,
                    securityDeposit:  building.apartment.securityDeposit,
                    tenatsInApartment:  building.apartment.tenatsInApartment,
                }
            ]
        },
        user: {
            _id: user._id,
            name: user.name,
            lastName : user.lastName,
            email: user.email,
            password: user.password,
            tenant: user.tenant
        }

    });
    //add a transaction in case something goes wrong with the first rental 
    //we will make sure both building.save and res.save, both save or both not saved
    rental = await rental.save();
    building.apartmentsAvailable--;
    building.save();

    // apartment.apartmentsAvailable--;
    // apartment.save();

    res.send(rental)
});

module.exports = router;