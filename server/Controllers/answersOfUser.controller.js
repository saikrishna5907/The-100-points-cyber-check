const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
 var { AnswersOfUser} = require('../models/anwersOfUser');
const userId = require('../config/jwtHelper')
const AnswersOfUsers = mongoose.model('AnswersOfUser');

module.exports.saveNoOfCorrectAnswers = (req, res, next) => {
    var correctAnswers = new AnswersOfUsers();
    correctAnswers.user_Id = req.body.user_Id;
    correctAnswers.timeOfQuestionsAnswered = req.body.timeOfQuestionsAnswered;
    correctAnswers.answers = req.body.answers;
    correctAnswers.save((err,docs) => {
        if(!err){
            res.send(docs);
        }
        else{
            return next(err);
        }
    });
}

module.exports.getAllNoOfCorrectAnswers = (req, res, next) => {
    AnswersOfUsers.find((err, docs) => {
        if(!docs){
            return res.status(404).json({status: false, message: 'data not found'});
        }
        else
            return res.status(200).json(docs);
    });
}
module.exports.getSingleNoOfCorrectAnswers= (req,res,next) => {
    if(ObjectId.isValid(req.params.id))
    {

        AnswersOfUsers.findById(req.params.id, (err,doc) => {
            if(!err)
                return res.status(200).json(doc);
            else 
                return res.status(404).json({status: false, message: 'single data not found'});
        });
    }
    else
        return res.status(400).send('No record found with that id :' + req.params.id );
}