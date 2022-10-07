const {Building, validateBuilding} = require('../models/building');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); //use when using express in different files 


///////////////////////////////////////////////////////
/*              Adding Routes                        */
////////////////////////////////////////////////////////



router.get('/', async (req, res) => {
    const building = await Building.find().sort('name');
    res.send(building);
});


//POST
router.post('/', async (req, res) => {
    const result = validateBuilding(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
      
    
    let building = new Building({ 
        buildingName: req.body.buildingName,
        buildingAddress: req.body.buildingAddress,
        numberOfApartments: req.body.numberOfApartments,
        monthlyRent: req.body.monthlyRent,
        ownsBy: req.body.ownsBy,
        apartmentsAvailable: req.body.apartmentsAvailable

     });
    building = await building.save();
    res.send(building); //return course to the client 
});


/*  PUT
    This will update any attribute value 
*/ 
router.put('/:id', async (req, res) => {
    //input validation using joi
    const result = validateBuilding(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
            
    const building = await Building.findByIdAndUpdate(req.params.id, {
        buildingName: req.body.buildingName,
        buildingAddress: req.body.buildingAddress,
        numberOfApartments: req.body.numberOfApartments,
        monthlyRent: req.body.monthlyRent,
        ownsBy: req.body.ownsBy,
        apartmentsAvailable: req.body.apartmentsAvailable}, {
        new: true
    })

    if(!building) return res.status(404).send('The building with the given ID was not found');
    
    res.send(building);
});



/*  Delete  */
router.delete('/:id',async (req, res) => {
    const building = await Building.findByIdAndRemove(req.params.id);
    if(!building) return res.status(404).send('The building with the given ID was not found');
    res.send(building);
});


/*  GET  */
router.get('/:id', async (req, res) => {
    const building = await Building.findById(req.params.id);
    if(!building) return res.status(404).send('The building with the given ID was not found');
   
    res.send(building);
});



module.exports = router;