const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const landlordSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    username: String,
    buildingOwn: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length > 0;
            },
            message: 'Landlord should own at least 1 building.'
        }
    },
    tenants: String
});

const Landlord = mongoose.model('Landlord', landlordSchema);

/*  Add filters  */
async function getLandlords(){
    return await Landlord
    .find()
    .sort({name: 1})
    .select({name: 1, buildingOwn: 1});
}

/*  Displaying the courses  */
async function run(){
    const landlord = await getLandlords();
    console.log(landlord);
}

async function createLandlord(){
    const landlord = new Landlord({
        name: 'Donald',
        lastName: 'Trump',
        username: 'trumpD',
        buildingOwn: ['trump tower', 'trump tower 2']
    });
    try{
        const result = await landlord.save();
        console.log(result);
    }
    
    catch (ex) {
        console.log(ex.message);
    }
}

createLandlord();
// run();
