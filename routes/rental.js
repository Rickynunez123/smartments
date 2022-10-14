const {Rental, validateRental } = require('../models/rental');
const {Building} = require('../models/building');
const {Landlord} = require('../models/landlord');
const {Tenant} = require('../models/tenants');
const {Apartment} = require('../models/apartments');
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

    const apartment = await Apartment.findById(req.body.apartmentId);
    if(!apartment) return res.status(400).send('Invalid Apartment');

    const tenant = await Tenant.findById(req.body.tenantId);
    if(!tenant) return res.status(400).send('Invalid Tenant');

    const landlord = await Landlord.findById(req.body.landlordId);
    if(!landlord) return res.status(400).send('Invalid Landlord')

    let rental = new Rental({
        building: {
            buildingName: building.buildingName,
            buildingAddress: building.buildingAddress,
            numberOfApartments: building.numberOfApartments,
            apartmentsAvailable: building.apartmentsAvailable,
        },
        tenant: {
            name: tenant.name,
            lastName: tenant.lastName,
            phone: tenant.phone
        },
        landlord: {
            name: landlord.name,
            lastName: landlord.lastName,
            phone: landlord.phone
        },
        apartment: {
            apartmentNumber: apartment.apartmentNumber,
            monthlyRent: apartment.monthlyRent,
            securityDeposit: apartment.securityDeposit
        }

    });
    //add a transaction in case something goes wrong with the first rental 
    //we will make sure both building.save and res.save, both save or both not saved
    rental = await rental.save();

    // apartment.apartmentsAvailable--;
    // apartment.save();

    res.send(rental)
});

module.exports = router;