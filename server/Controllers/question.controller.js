const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var {Question} = require('../models/question.model');

const Questions = mongoose.model('Question');
module.exports.getAllQuestions = (req, res, next) => {
    Questions.find(
        (err, docs) => {
            if(!docs)
                return res.status(404).json({status: false, message: 'questions not found'});
            else
                return res.status(200).json(docs);
        });
}

module.exports.getSingleQuestion = (req,res,next) => {
    if(ObjectId.isValid(req.params.id))
    {

        Questions.findById(req.params.id, (err,doc) => {
            if(!err)
                return res.status(200).json(doc);
            else 
                return res.status(404).json({status: false, message: 'question not found'});
        });
    }
    else
        return res.status(400).send('No question found with that id :' + req.params.id );
}

module.exports.postQuestion = (req, res, next) => {
 var question  = new Questions();
 question.question = req.body.question;
 question.questionCategory = req.body.questionCategory;
 question.questionType = req.body.questionType;
 question.options = req.body.options;
 question.save((err,docs) => {
    if (!err) {
        res.send(docs);
    }
    else {
            return next(err);
    }
 });
}

module.exports.updateQuestion = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No question found with that id :' + req.params.id );
    var ques = {
        question : req.body.question,
        questionCategory: req.body.questionCategory,
        questionType : req.body.questionType,
        options : req.body.options
    };

    Questions.findByIdAndUpdate(req.params.id, {$set: ques},{new : true}, (err, doc) => {
        if(!err)
                return res.status(200).json(doc);
            else 
                return res.status(404).json({status: false, message: 'Error in question update'});
    });
}

module.exports.deleteQuestion = (req,res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No question found with that id :' + req.params.id );

    Questions.findByIdAndDelete(req.params.id, (err, doc) => {
        if(!err)
                return res.status(200).json(doc);
            else 
                return res.status(404).json({status: false, message: 'Error in question delete'});
    });


}




// router.get('/', (req,res) => {
//     Question.find((err,docs) => {
//         if(!err) 
//         {
//             res.send(docs);
//         }
//         else
//         {
//             console.log('Error in retrieving questions : ' + JSON.stringify(err, undefined, 2));
//         }
//     });
// });

// module.exports = router;