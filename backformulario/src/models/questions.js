const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionOne: {type: String},
    questionTwo: {type: String},
    questionThree: {type: String},
});

module.exports = mongoose.model('Questions',questionSchema);