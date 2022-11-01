const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); //protect the information when is transferred 
const config = require('config');
 



mongoose.connect('mongodb+srv://rnunezcu123:Tsonga12345@smartments.cldqt31.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

/*  Building Schema
    Adding the attributes with the data type 
    Tenants model
*/
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lastName: {
        type: String, 
        required: true
    },
    username:{
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String, 
        minlength: 5,
        required: true,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean,
    tenant: [
        {
        phone: String,
        pictureOfID: Boolean,//change to an actual picture later 
        annualIncome: Number
        }
    ],
    landlord: [{
        phone: String,
        pictureOfID: Boolean,//change to an actual picture later 
    }]

});

//when we decode the jwt, this is the object that is going to get {_id: this.id}
//then it will put this in the request of middleware auth req.user = decoded
// userSchema.methods.generateAuthToken = function(){
//     const token = jwt.sign({_id: this.id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
//     return token;
// }

const User = mongoose.model('User', userSchema);


async function createUser(){
    const tenant = new Tenant({
        name: 'Ricky ',
        email: 'rnunezcumtu.edu' ,
        password: 'changeMe'
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



async function removeUser(id){
    // const result =  await Tenant.deleteOne({ _id: id });
    const result = await User.findByIdAndRemove(id);
    console.log(result);
}




/*  FUNCTION  */
function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().regex(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i).required().label("Email").messages({
            "object.regex": "Must have at least 8 characters",
            "string.pattern.base": "Invalid email"
              }),      
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().label("Password").messages({
                  "object.regex": "Must have at least 8 characters",
                  "string.pattern.base": "Password should have at least 8 characters and numbers"
                    }),
        isAdmin: Joi.boolean(),
        tenantId:  Joi.string(),
        landlordId: Joi.string()
    });

    //input validation using joi
    return schema.validate(user);
}

function validateUserLogin(user){
    const schema = Joi.object({
        email: Joi.string().regex(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i).required().label("Email").messages({
            "object.regex": "Must have at least 8 characters",
            "string.pattern.base": "Invalid email"
              }),        
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().label("Password").messages({
                "object.regex": "Must have at least 8 characters",
                "string.pattern.base": "Password should have at least 8 characters and numbers"
                  }),    });

    //input validation using joi
    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
exports.userSchema = userSchema;
// exports.generateAuthToken = this.generateAuthToken;
exports.userSchema = this.userSchema;
exports.validateUserLogin = validateUserLogin;