const Joi = require('joi');
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

/*  Building Schema
    Adding the attributes with the data type 
    Tenants model
*/
const Tenant = mongoose.model('Tenant', mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String},
    userName: {type: String},
    password: {type: String},
    renting: {type: Boolean},
    annualIncome: Number,
    buildingName: String, 
    //if they are renting, then they need to submit their annual income, otherwise no
    apartmentNumber: {
        type: Number,
        required: function() {return this.renting; }
    }
}));


async function createTenant(){
    const tenant = new Tenant({
        name: 'alan ',
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

createTenant();
// removeTenant('633d8c8bd0005efb05a8635e');


/*  FUNCTION  */
function validateTenant(tenant){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        userName: Joi.string().min(3).required(),
        password: Joi.string().min(3).required(),
        renting: Joi.boolean(),
        annualIncome: Joi.number().min(0)

    });

    //input validation using joi
    return schema.validate(tenant);
}

exports.Tenant = Tenant;
exports.validateTenant = validateTenant;