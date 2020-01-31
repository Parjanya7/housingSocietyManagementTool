const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   
    Notice: { type: String, required: false },
    Meeting: { type: String, required: false }

}, { timestamps : true });

module.exports = mongoose.model( 'notices', schema );