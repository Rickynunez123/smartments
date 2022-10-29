const Joi = require('joi');
const {User} = require('../models/user'); //object destructuring
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); //use when using express in different files 
const _ = require('lodash');
const bcrypt = require('bcrypt'); //hash passwords 



router.post('/', async (req, res) => {
    const result = validateAuth(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    //check that the user is not already register 
    let user  = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Invalid email or password. '); //validating the username or email
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password. '); //validatingpassword

    // chunks of data sent to the server and that cannot be accessed ordinarily
    //protect the information when is transferred 
    const token = user.generateAuthToken(); //generate token and then send it to the client 
    res.send(token);
});


function validateAuth(req){
    const schema = Joi.object({
        email: Joi.string().min(3).required(),
        password: Joi.string().min(3).required()

    });
    return schema.validate(req);
}

module.exports = router;