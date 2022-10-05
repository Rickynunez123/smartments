const { number } = require('joi');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/smartments', {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log('Connected to MonogDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const buildingSchema = new mongoose.Schema({
    buildingName: String,
    buildingAddress: String,
    numberOfApartments: Number,
    monthlyRent: Number,
    ownsBy: String,
    apartmentsAvailable: Number
});

const Building = mongoose.model('Building', buildingSchema);

/*  Add filters  */
async function getBuilding(){
    return await Building
    .find()
    .sort({monthlyRent: 1})
    .select({buildingName: 1, monthlyRent: 1, apartmentsAvailable: 1})
}

/*  print  */
async function run(){
    const landlord = await getBuilding();
    console.log(landlord);
}

async function createBuilding(){
    const building = new Building({
        buildingName: 'Trump Tower',
        buildingAddress: '1800 Oak NY',
        numberOfApartments: 50,
        monthlyRent: 5_000,
        ownsBy: 'Donald Trump',
        apartmentsAvailable: 48
    });
try{
    const result = await building.save();
    console.log(result);
}

    catch (ex) {
        console.log(ex.message);
}
}

/*  Updating queries  */
async function updateBuilding(id){
    const building = await Building.findById(id);
    if(! building) return;

    building.monthlyRent = 10_000;

    const result = await building.save();
    console.log(result);
}

async function updateApartments(id){
    const result = await Building.updateOne({ _id: id}, {
        $set: {
            buildingName: 'Trump Tower',
            apartmentsAvailable: 47
        }
    });
    console.log(result);
}


// createBuilding();
// updateApartments('633d9b0143eba8ae1c586c95');
// updateBuilding('633d915649017e6452d9f9b2');
run();
