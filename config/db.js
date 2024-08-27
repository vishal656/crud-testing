let mongoose = require('mongoose');

async function db(){
    await mongoose.connect("mongodb://127.0.0.1:27017/crudTesting").then(()=>{
        console.log('db connection established');
    }).catch(err => console.log(err));
}

module.exports = db;