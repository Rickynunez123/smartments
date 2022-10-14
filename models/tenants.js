const Joi = require('joi');
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

/*  Building Schema
    Adding the attributes with the data type 
    Tenants model
*/
const tenantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: String,
    password: String,
    renting: {type: Boolean},
    phone: Number,
    annualIncome: Number //if they are renting, then they need to submit their annual income, otherwise no
});

const Tenant = mongoose.model('Tenant', tenantSchema);


async function createTenant(){
    const tenant = new Tenant({
        name: 'Ricky ',
        lastName: 'Nunez',
        userName: 'rnunezcu',
        password: 'changeMe',
        renting: true,
        phone: 9381418888,
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


/*  FUNCTION  */
function validateTenant(tenant){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        userName: Joi.string().min(3).required(),
        password: Joi.string().min(3).required(),
        renting: Joi.boolean(),
        phone: Joi.number(),
        annualIncome: Joi.number().min(0)

    });

    //input validation using joi
    return schema.validate(tenant);
}

exports.Tenant = Tenant;
exports.validateTenant = validateTenant;
exports.tenantSchema = tenantSchema;
