const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); //use when using express in different files 
const Joi = require('joi');

// CHANGE TENANTS!!! AND CONNECT IT WITH INDEX.JS
//ADD ALL THE ROUTES!!

mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const tenantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    renting: {type: Boolean, required: true},
    annualIncome: Number,
    buildingName: String,
    apartmentNumber: {
        type: Number,
        required: function() {return this.renting; }
    }
});

const Tenant = mongoose.model('Tenant', tenantSchema);

async function createTenant(){
    const tenant = new Tenant({
        name: 'Ricardo',
        lastName: 'Nunez',
        userName: 'rnunezcu',
        password: 'changeMe',
        renting: false,
        annualIncome: 200_000
    });
    /*  handling rejections of promises  */
    try{
        const result = await tenant.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
}



async function removeTenant(id){
    // const result =  await Tenant.deleteOne({ _id: id });
    const result = await Tenant.findByIdAndRemove(id);
    console.log(result);
}

// createTenant();
// removeTenant('633d8c8bd0005efb05a8635e');


///////////////////////////////////////////////////////
/*              Adding Routes                        */
////////////////////////////////////////////////////////


router.get('/', async (req, res) => {
    const tenants = await Tenant.find().sort('name');
    res.send(tenants);
});


//POST
router.post('/', async (req, res) => {
    const result = validateCourse(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
      
    
    let tenant = new Tenant({ name: req.body.name});
    tenant = await tenant.save();
    res.send(tenant); //return course to the client 
});


/*  PUT  */ 
router.put('/:id', async (req, res) => {
    //input validation using joi
    const result = validateCourse(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
            
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, {name: req.body.name }, {
        new: true
    })

    if(!tenant) return res.status(404).send('The tenant with the given ID was not found');
    
    //Update course 
    res.send(tenant);
});


/*  Delete  */
router.delete('/:id',async (req, res) => {
    const tenant = Tenant.findByIdAndRemove(req.params.id);
    if(!tenant) return res.status(404).send('The tenant with the given ID was not found');
    res.send(tenant);
});


/*  GET  */
router.get('/:id', async (req, res) => {
    const tenant = await Tenant.findById(req.params.id);


    if(!course) return res.status(404).send('The course with the given ID was not found');
   
    res.send(course);
});


/*  FUNCTION  */
function validateCourse(tenant){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    //input validation using joi
    return schema.validate(tenant);
}


module.exports = router;