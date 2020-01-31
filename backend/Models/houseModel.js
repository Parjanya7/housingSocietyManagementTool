const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   
    houseNo : { type : Number, required : true },
    houseName : { type : String, required : true },
    MobileNo : { type : Number, required : true },
    Address : { type : String, required : true },
    PostalCode : { type : Number, required : true },
    phCode : { type: Number, required: true},
    PhoneNo : { type : String, required : true },
    img : { type : Buffer, required : false },
    Payment: { 
        man: { type: Number, require: false },
        park: { type: Number, require: false },
        fest: { type: Number, require: false },
        other: { type: Number, require: false },
        total: { type: Number, require: true }        
    } 
    
}, { timestamps : true });

module.exports = mongoose.model( 'houses', schema );