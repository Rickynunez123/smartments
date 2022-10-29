const {User, validateUser, generateAuthToken} = require('../models/user'); //object destructuring
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); //use when using express in different files 
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //protect the information when is transferred 
const config = require('config');
const auth = require('../middleware/auth');
const {Tenant} = require('../models/tenants');
const {Landlord } = require('../models/landlord');



//get user information with JWT 
router.get('/me', auth, async (req, res) => {
    // const user = await User.findById(req.user._id).select('-password'); //hidding password
    const user = await User.findById(req.user._id);

    res.send(user);
})

//authenticating users 
router.post('/', async (req, res) => {
    const result = validateUser(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    //check that the user is not already register 
    let user  = await User.findOne({ email: req.body.email })
    if(user) return res.status(400).send('Email is already registered an account. ');

    
    user  = new User({
        name: req.body.name,
        lastName :req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        tenant: [],
        landlord: []
    });
    const salt  = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();


    const token = user.generateAuthToken(); //generate token and then send it to the client 
    res.header('x-auth-token', token).send(_.pick(user, ["_id",'name', 'email'])); 

});

//delete token to log out 


module.exports = router;