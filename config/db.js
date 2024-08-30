let mongoose = require('mongoose');
let dotenv = require('dotenv');
dotenv.config();
async function db(){
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('db connection established');
    }).catch(err => console.log(err));
}

module.exports = db;