const {Apartment, validateApartment} =  require('../models/apartments');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth =  require('../middleware/auth');
const admin = require('../middleware/admin');
const { Building, validateBuilding } = require('../models/building');



router.get('/', async (req, res) => {
    const apartment = await Apartment.find();
    res.send(apartment);
});


router.post('/' ,async (req, res) => {
    const result = validateApartment(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const building = await Building.findById(req.body.buildingId);
    if(!building) return res.status(400).send('Building user');

    let apartment = new Apartment({
        apartmentNumber: req.body.apartmentNumber,
        monthlyRent: req.body.monthlyRent,
        securityDeposit: req.body.securityDeposit,
        tenatsInApartment: req.body.tenatsInApartment,

        building: {
            buildingName: building.buildingName,
            buildingAddress:building.buildingAddress,
            numberOfApartments: building.numberOfApartments,
            apartmentsAvailable:building.apartmentsAvailable,
            user: {
                _id: building.user._id,
                name: building.user.name,
                lastName :  building.user.lastName,
                email:  building.user.email,
                password:  building.user.password,
                landlord: [ building.user.landlord ]},
            apartment: [
                {
                    apartmentNumber: req.body.apartmentNumber,
                    monthlyRent: req.body.monthlyRent,
                    securityDeposit: req.body.securityDeposit,
                    tenatsInApartment: req.body.tenatsInApartment,
                }
            ]
        }
    });
    apartment = await apartment.save();
    
    // return the user information into the table 
    const building1 = await Building.findByIdAndUpdate(building.id, {
       apartment:[{
        apartmentNumber: apartment.apartmentNumber,
                    monthlyRent: apartment.monthlyRent,
                    securityDeposit: apartment.securityDeposit,
                    tenatsInApartment: apartment.tenatsInApartment,
       }] //spread operator 
    }, {
        new: true
    })

    if(!building1) return res.status(404).send('The building with the given ID was not found');
    res.send(apartment);



});


router.put('/:id', async (req,res) => {
    const result = validateApartment(req.body);
    if(result.error)
    return res.status(400).send(result.error.details[0].message);

    const apartment = await Apartment.findByIdAndUpdate(req.params.id, {
        apartmentNumber: req.body.apartmentNumber,
        monthlyRent: req.body.monthlyRent,
        securityDeposit: req.body.securityDeposit,
        tenatsInApartment: req.body.tenatsInApartment
    }, {
        new: true
    })
    if(!apartment) return res.status(400).send('The apartment with the given ID was not found');

    res.send(apartment);
});

router.delete('/:id', async (req, res) => {
    const apartment = await Apartment.findByIdAndRemove(req.params.id);
    if(!apartment) return res.status(404).send('The apartment with the given id was not found');
    res.send(apartment);
});

router.get('/:id', async(req, res) => {
    const apartment = await Apartment.findById(req.params.id);
    if(!apartment) return res.status(404).send('The apartment with the given id was not found');
    res.send(apartment);

});

module.exports = router;