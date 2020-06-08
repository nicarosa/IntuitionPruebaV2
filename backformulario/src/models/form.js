const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EncuestaSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String},
    phone: {type: String},
    questionOne: {type: String},
    answerOne: {type: String},
    questionTwo: {type: String},
    answerTwo: {type: String},
    questionThree: {type: String},
    answerThree: {type: String},
    date: {type: Date}
});

module.exports = mongoose.model('Encuestas',EncuestaSchema);