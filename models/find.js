let mongoose = require('mongoose');

let articleFindSchema = mongoose.Schema({
    title:{
        type: String,
        required: false
    },
    author:{
        type: String,
        required: false
    },
    body:{
        type: String,
        required: false
    }
});

let Article = module.exports = mongoose.model('Find', articleFindSchema);
