const {User, validateUser, generateAuthToken, validateUserLogin} = require('../models/user'); //object destructuring
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

/**
 * @swagger
 * paths:
 *  /api/smartments/users/{id}:
 *  get:
 *      description: get a single user, it required the id
 *  parameters:
 *      - in: path
 *        name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: it retrieves the user information
 *      responses:
 *           200: 
 *              description: A succesful response 
 *              contents:
 *                  application/json
 *           404:
 *              description: The id of the user was not found 
 * 
 *          
 * 
 * 
 */
router.get('/:id', async (req, res) => {
    // const user = await User.findById(req.user._id).select('-password'); //hidding password
    // const user = await User.findById(req.user._id);

    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('The user with the given ID was not found');
    res.send(user);
})



router.post('/', async (req, res) => {
    const result = validateUser(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    //check that the user is not already register 
    let user  = await User.findOne({ email: req.body.email })
    if(user) return res.status(400).send('Email is already registered an account. ');

    let username  = await User.findOne({ username: req.body.username })
    if(username) return res.status(400).send('That username is already registered. ');

    
    user  = new User({
        name: req.body.name,
        lastName :req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
        tenant: [],
        landlord: []
    });
    //made up of random bits added to each password instance before its hashing genSalt(10)
    const salt  = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(user);


    // const token = user.generateAuthToken(); //generate token and then send it to the client 
    // res.header('x-auth-token', token).send(_.pick(user, ["_id",'name', 'email'])); 

});

//Login in homepage 
router.post('/auth', async (req, res) => {
    const result = validateUserLogin(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    let user  = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Invalid email or password. '); //validating the username or email


    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password. ');

    res.send(user.id);
    
})


//delete token to log out 
module.exports = router;