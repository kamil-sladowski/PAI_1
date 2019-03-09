let mongoose = require('mongoose');


// Article Schema
let aboutSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

let About = module.exports = mongoose.model('About', aboutSchema);