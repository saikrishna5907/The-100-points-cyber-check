const mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
    user_Id : {
        type: String,
        required: 'user ID is be empty'
    },
    question_Id : {
        type: String,
        required: 'question ID is be empty'
    },
    answerforQ_IdU_Id : {
        type: Number,
        required: 'answer cannot be empty'
    }
    
});
mongoose.model('Answer', answerSchema);