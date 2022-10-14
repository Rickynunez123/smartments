const {Building, validateBuilding} = require('../models/building');
const {Tenant} = require('../models/tenants');
const {Apartment} = require('../models/apartments');
const { Landlord } = require('../models/landlord');
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
      
    const tenant = await Tenant.findById(req.body.tenantId);
    if(!tenant) return res.status(400).send('Invalid Tenant');

    const apartment = await Apartment.findById(req.body.apartmentId);
    if(!apartment) return res.status(400).send('Invalid apartment');
    
    const landlord = await Landlord.findById(req.body.landlordId);
    if(!landlord) return res.status(400).send('Invalid landlord');


    let building = new Building({ 
        buildingName: req.body.buildingName,
        buildingAddress: req.body.buildingAddress,
        numberOfApartments: req.body.numberOfApartments,
        apartmentsAvailable: req.body.apartmentsAvailable,
        tenant: {
            _id: tenant._id,
            name: tenant.name,
            lastName: tenant.lastName,
            phone: tenant.phone
        },
        apartment: {
            _id: apartment._id,
            apartmentNumber: apartment.apartmentNumber,
            monthlyRent: apartment.monthlyRent

        },
        landlord: {
            name: landlord.name,
            lastName: landlord.lastName,
            phone: landlord.phone
        }


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
    if (result.error) return res.status(400).send(result.error.details[0].message);
            
    const building = await Building.findByIdAndUpdate(req.params.id, {
        buildingName: req.body.buildingName,
        buildingAddress: req.body.buildingAddress,
        numberOfApartments: req.body.numberOfApartments,
        ownsBy: req.body.ownsBy,
        apartmentsAvailable: req.body.apartmentsAvailable
    
    }, {
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