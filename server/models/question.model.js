const mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    question : {
        type: String,
        required: 'question cannot be empty'
    },
    questionCategory : {
        type: String,
        required: 'question cannot be empty'
    },
    questionType : {
        type: String,
        required: 'question cannot be empty'
    },
    options : Array
    
});
mongoose.model('Question', questionSchema);