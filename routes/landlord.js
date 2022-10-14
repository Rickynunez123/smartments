const {Landlord, validateLandlord} = require('../models/landlord');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const landlord = await Landlord.find();
    res.send(landlord);
});


router.post('/', async (req, res) => {
    const result = validateLandlord(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    let landlord = new Landlord({
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        phone: req.body.phone
    });
    landlord = await landlord.save();
    res.send(landlord);
});

router.put('/:id', async (req, res)=> {
    const result = validateLandlord(req.body);
    if(result.error)
    return res.status(400).send(result.error.details[0].message);

    const landlord = await Landlord.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        phone: req.body.phone
    },{
        new: true
    })
    if(!landlord) return res.status(404).send('The landlord with the given Id was not found');
    res.send(landlord);
});

router.delete('/:id', async (req, res) => {
    const landlord = await Landlord.findByIdAndRemove(req.params.id);
    if(!landlord) return res.status(404).send('Thelandlord with the given id was not found');
    res.send(landlord);
});

router.get('/:id', async (req, res) => {
    const landlord = await Landlord.findById(req.params.id);
    if(!landlord) return res.status(404).send('The landlord with the given id was not found');
    res.send(landlord);
});

module.exports = router;