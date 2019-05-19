const express = require('express');

const router = express.Router();

const ctlrUser = require('../Controllers/user.controller');
const questionController = require('../Controllers/question.controller')
const answerController = require('../Controllers/answer.controller')
const jwtHelper  = require ('../config/jwtHelper');

router.post('/register' , ctlrUser.register);
router.post('/authenticate' , ctlrUser.authenticate);
router.post('/questions', questionController.postQuestion);
router.get('/questions/:id', questionController.getSingleQuestion)
router.put('/questions', questionController.updateQuestion);
router.delete('/questions', questionController.deleteQuestion);
router.get('/userProfile' , jwtHelper.verifyJwtToken, ctlrUser.userProfile);
router.get('/questions', questionController.getAllQuestions);
router.post('/answers' ,answerController.saveAnswers);
router.get('/answers', jwtHelper.verifyJwtToken,answerController.getAnswersForCurrentUser)
module.exports = router; 