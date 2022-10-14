const {Tenant, validateTenant} = require('../models/tenants'); //object destructuring
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); //use when using express in different files 


///////////////////////////////////////////////////////
/*              Adding Routes                        */
////////////////////////////////////////////////////////


router.get('/', async (req, res) => {
    const tenants = await Tenant.find().sort('name');
    res.send(tenants);
});


//POST
router.post('/', async (req, res) => {
    const result = validateTenant(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    

    let tenant = new Tenant({ 
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        renting: req.body.renting,
        phone: req.body.phone

     });
    tenant = await tenant.save();
    res.send(tenant); //return course to the client 
});


/*  PUT  */ 
router.put('/:id', async (req, res) => {
    //input validation using joi
    const result = validateTenant(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
            
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        renting: req.body.renting,
        phone: req.body.phone

    }, {
        new: true
    })

    if(!tenant) return res.status(404).send('The tenant with the given ID was not found');
    
    //Update course 
    res.send(tenant);
});


/*  Delete  */
router.delete('/:id',async (req, res) => {
    const tenant = await Tenant.findByIdAndRemove(req.params.id);
    if(!tenant) return res.status(404).send('The tenant with the given ID was not found');
    res.send(tenant);
});


/*  GET  */
router.get('/:id', async (req, res) => {
    const tenant = await Tenant.findById(req.params.id);
    if(!tenant) return res.status(404).send('The tenant with the given ID was not found');
   
    res.send(tenant);
});


module.exports = router;