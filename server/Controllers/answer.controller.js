const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Answer } = require('../models/answers.model');
const userId = require('../config/jwtHelper')
const Answers = mongoose.model('Answer');

module.exports.saveAnswers = (req, res, next) => {
    var answer = new Answers();
    answer.user_Id = req.body.user_Id;
    answer.question_Id = req.body.question_Id;
    answer.answerforQ_IdU_Id = req.body.answerforQ_IdU_Id;
    // if (ObjectId.isValid(answer.user_ID) && ObjectId.isValid(question_Id)) {
        answer.save((err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
                return next(err);
            }
        });
    // }
}
module.exports.getAnswersForCurrentUser = (req, res, next) => {
    Answers.find({user_Id: userId.userId},
        (err, docs) => {
            if(!docs)
                return res.status(404).json({status: false, message: 'answers not found'});
            else
                return res.status(200).json(docs);
        })
}