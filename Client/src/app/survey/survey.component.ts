import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../shared/question.service';
import {AnswersService} from '../shared/answers.service';
import { MatRadioChange, MatRadioButton } from '@angular/material';
import { Answer } from '../shared/answer.model';
import {Question} from '../shared/question.model';
import {Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent implements OnInit {  
  questions: any;
  answersFromAPI: Observable<any>;
  userId: any;
  results: any[];
  answeredquestionWithID: any;

  showSuccessMessage: boolean;
  serverErrorMessages:String;
  
  
  
  
  noOfRiskQuestions = 0;
  noOfSecurityQuestions = 0;

  
  firstTypeQuestion: FormGroup;
  secondTypeQuestion: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router,private questionService: QuestionService, private answerService: AnswersService) { }
 


  onClick(questionId:String, choice : number){
    choice++
    var answer :Answer ={      
      user_Id : this.userId,
      question_Id : questionId,
      answerforQ_IdU_Id : choice
    };
    this.answerService.saveAnswers(answer).subscribe(
      res => {
        this.showSuccessMessage =true;
        setTimeout(() =>this.showSuccessMessage =false,4000);
      },
      err => {
        if(err.status === 422){
          this.serverErrorMessages = err.error.join ('<br/>')
        }
        else
          this.serverErrorMessages = 'Something went wrong. Please contact admin.'
      }
    );  

  }

  ngOnInit() {
    this.firstTypeQuestion = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondTypeQuestion = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    //currently logged in user id
    this.userId = this.questionService.getUserInfo(); 

    //retrieving ques and count of no.of ques in each category
    this.questionService.getQuestions().subscribe((res) => {
      this.questions = res;
      this.questions.forEach(q => {
        if(q.questionCategory === 'riskAnalysis'){
          this.noOfRiskQuestions++
        }
        if(q.questionCategory === 'securityAnalysis'){
          this.noOfSecurityQuestions++
        }
      });
    }) ;
    //getting answers 
    this.answerService.getAnswers().subscribe((res) => {
      this.answersFromAPI = res;
      console.log(this.answersFromAPI)
      });
    // this.showTable()
    //getting answered questions for table use
  }
}
