const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
     mobileNo:  {
        type: String,
        trim: true,
        required: [true, 'Enter your mobile number'],
     },

     personCount: {
        type: String,
        trim: true,
        require: [true, 'Enter count person'],
     },

     name: {
        type: String,
        trim: true,
        default: '',
     },

     queueID: {
         type: String,
         trim: true,
         default: '',
     },

     serve: {
        type: Boolean,
        default: false,
     },

     serveDone: {
        type: Boolean,
        default: false, 
     },

     createOn: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('Queue', queueSchema);