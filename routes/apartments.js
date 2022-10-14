const {Apartment, validateApartment} =  require('../models/apartments');
const mongoose = require('mongoose');
const express = require('express');
const { route } = require('./building');
const router = express.Router();


router.get('/', async (req, res) => {
    const apartment = await Apartment.find();
    res.send(apartment);
});


router.post('/', async (req, res) => {
    const result = validateApartment(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    let apartment = new Apartment({
        apartmentNumber: req.body.apartmentNumber,
        monthlyRent: req.body.monthlyRent,
        securityDeposit: req.body.securityDeposit,
        tenatsInApartment: req.body.tenatsInApartment
    });
    apartment = await apartment.save();
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