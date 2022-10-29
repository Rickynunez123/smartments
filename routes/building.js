const {Building, validateBuilding} = require('../models/building');
const {Apartment} = require('../models/apartments');
const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); //use when using express in different files 
const auth =  require('../middleware/auth');
const admin = require('../middleware/admin');



///////////////////////////////////////////////////////
/*              Adding Routes                        */
////////////////////////////////////////////////////////



router.get('/', async (req, res) => {
    const building = await Building.find().sort('name');
    res.send(building);
});



//POST
//add the middleware function to make sure that only autorhizes users can create apartments 
router.post('/',async (req, res) => {
    const result = validateBuilding(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    
    const user = await User.findById(req.body.userId);
    if(!user) return res.status(400).send('Invalid user');


    let building = new Building({ 
        buildingName: req.body.buildingName,
        buildingAddress: req.body.buildingAddress,
        numberOfApartments: req.body.numberOfApartments,
        apartmentsAvailable: req.body.apartmentsAvailable,
        apartment: [],
        user: {
            _id: user._id,
            name: user.name,
            lastName : user.lastName,
            email: user.email,
            password: user.password,
            landlord: user.landlord
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


//to delete first the user needs to have a json web token and if that is true it also needs to be an admin 
/*  Delete  */
router.delete('/:id', [auth, admin] ,async (req, res) => {
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