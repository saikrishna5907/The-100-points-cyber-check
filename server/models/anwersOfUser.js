const mongoose = require('mongoose');

var answersOfUserSchema = new mongoose.Schema({
    user_Id: {
        type:String,
        required: 'user Id is empty'
    },
    timeOfQuestionsAnswered: {
        type: String,
        required:'time is empty'
    },
    answers: Array

})
mongoose.model('AnswersOfUser', answersOfUserSchema);