const express = require('express');

const router = express.Router();

const ctlrUser = require('../Controllers/user.controller');
const questionController = require('../Controllers/question.controller')
const answerController = require('../Controllers/answer.controller')
const answersForEachUserController = require('../Controllers/answersOfUser.controller')
const jwtHelper  = require ('../config/jwtHelper');

router.post('/register' , ctlrUser.register);
router.post('/authenticate' , ctlrUser.authenticate);
router.post('/questions', questionController.postQuestion);
router.get('/questions/:id',jwtHelper.verifyJwtToken, questionController.getSingleQuestion)
router.put('/questions', questionController.updateQuestion);
router.delete('/questions', questionController.deleteQuestion);
router.get('/userProfile' , jwtHelper.verifyJwtToken, ctlrUser.userProfile);
router.get('/questions', jwtHelper.verifyJwtToken,questionController.getAllQuestions);
router.post('/answers' ,answerController.saveAnswers);
router.get('/answers', jwtHelper.verifyJwtToken,answerController.getAnswersForCurrentUser)
router.get('/answersOfUser', jwtHelper.verifyJwtToken, answersForEachUserController.getAllNoOfCorrectAnswers)
router.post('/answersOfUser', answersForEachUserController.saveNoOfCorrectAnswers)
module.exports = router; 