const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   
    UserName: { type: String, required: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    PassWord: { type: String, required: true },
    MobileNo: { type: Number, required: true },
    HouseNo: { type: Number, required: true },
    Access: { type: String, required: true }

}, { timestamps : true });

module.exports = mongoose.model( 'members', schema );