const Joi = require('joi');
const mongoose = require('mongoose');
const { userSchema } = require('./user');




mongoose.connect('mongodb+srv://rnunezcu123:Tsonga12345@smartments.cldqt31.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

/*  Building Schema
    Adding the attributes with the data type 
    Tenants model
*/
const tenantSchema = new mongoose.Schema({
    phone: String,
    pictureOfID: Boolean,//cahnge to an actual picture later 
    annualIncome: Number, 
    user: {
        type: userSchema,
        required: true
    }
});

const Tenant = mongoose.model('Tenant', tenantSchema);


//CHANGE 
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


//CAHNGE 
async function removeTenant(id){
    // const result =  await Tenant.deleteOne({ _id: id });
    const result = await Tenant.findByIdAndRemove(id);
    console.log(result);
}


/*  FUNCTION  */
function validateTenant(tenant){
    const schema = Joi.object({
        phone: Joi.string(),
        annualIncome: Joi.number().min(0),
        pictureOfID: Joi.boolean().required(),
        userId: Joi.string().required(),
    });
    
    //input validation using joi
    return schema.validate(tenant);
}

exports.Tenant = Tenant;
exports.validateTenant = validateTenant;
exports.tenantSchema = tenantSchema;

// createTenant();
// removeTenant('633d8c8bd0005efb05a8635e');