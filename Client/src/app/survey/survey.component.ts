import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../shared/question.service';
import { AnswersService } from '../shared/answers.service';
import { Answer } from '../shared/answer.model';
import { Question } from '../shared/question.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ChartsDataService} from '../shared/charts-data.service'
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent implements OnInit {
  questions: any;
  yourChoice: String
  currentAnswersForOC: Array<Answer> = [];
  currentAnswersForTCS: Array<Answer> = [];
  currentAnswersForTCNASC: Array<Answer> = [];
  currentAnswersForLRC: Array<Answer> = [];
  answersFromAPI: Observable<any>;
  userId: any;
  results: any[];
  answeredquestionWithID: any;
  showSuccessMessage: boolean;
  serverErrorMessages: String;
  noOfOCQuestions = 0;
  noOfTCSQuestions = 0;
  noOfTCNASCQuestions = 0;
  noOfLRCQuestions = 0;
  operationalControls_TypeQuestion: FormGroup;
  technicalControls_system_TypeQuestion: FormGroup;
  technicalControls_NASC_TypeQuestion: FormGroup;
  legalAndRegulatoryControls_TypeQuestion: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private questionService: QuestionService, private answerService: AnswersService, private chartServ: ChartsDataService) { }

//   MyStyle() {    
//     let mystyles = {    
      
//         'background-color': this.yourChoice!=null ? '#44a626' : 'transparent',    
//         // 'font-style': this.yourChoice!=null ? 'italic' : 'normal',    
//         // 'font-size.px': this.yourChoice!=null    
//     };    

//     return mystyles;    
// }  
  saveToLocalOC(questionId: String, choice: number) {

    // var element = document.getElementsByClassName('answerOption')[choice];
    // element.classList.add("hide");
    //increment to convert from 0 and 1 to 1 and 2 choices
    let ch = choice+1;
    var answer: Answer = {
      user_Id: this.userId,
      question_Id: questionId,
      answerforQ_IdU_Id: ch
    };  
    this.currentAnswersForOC.push(answer);
    // console.log(this.currentAnswersForOC)
    // var element = document.getElementsByClassName('answerOption')[choice];
    // element.classList.add("show");
  }
  saveToLocalTCS(questionId: String, choice: number) {
    //increment to convert from 0 and 1 to 1 and 2 choices
    choice++;
    var answer: Answer = {
      user_Id: this.userId,
      question_Id: questionId,
      answerforQ_IdU_Id: choice
    };
    this.currentAnswersForTCS.push(answer);
    console.log(this.currentAnswersForTCS)
  }
  saveToLocalTCNASC(questionId: String, choice: number) {
    //increment to convert from 0 and 1 to 1 and 2 choices
    choice++;
    var answer: Answer = {
      user_Id: this.userId,
      question_Id: questionId,
      answerforQ_IdU_Id: choice
    };
    this.currentAnswersForTCNASC.push(answer);
    console.log(this.currentAnswersForTCNASC)
  }
  saveToLocalLRC(questionId: String, choice: number) {
    //increment to convert from 0 and 1 to 1 and 2 choices
    choice++;
    var answer: Answer = {
      user_Id: this.userId,
      question_Id: questionId,
      answerforQ_IdU_Id: choice
    };
    this.currentAnswersForLRC.push(answer); +
      console.log(this.currentAnswersForLRC)
  }
  saveToDbOC() {
    this.currentAnswersForOC.forEach(x => {
      this.answerService.saveAnswers(x).subscribe(
        res => {
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 4000);
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>')
          }
          else
            this.serverErrorMessages = 'Something went wrong. Please contact admin.'
        }
      );

    })
  }
  saveToDbTCS() {
    this.saveToDbOC();
    this.currentAnswersForTCS.forEach(x => {
      this.answerService.saveAnswers(x).subscribe(
        res => {
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 4000);
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>')
          }
          else
            this.serverErrorMessages = 'Something went wrong. Please contact admin.'
        }
      );

    })
  }
  saveToDbTCNASC() {
    this.saveToDbTCS();
    this.currentAnswersForTCNASC.forEach(x => {
      this.answerService.saveAnswers(x).subscribe(
        res => {
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 4000);
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>')
          }
          else
            this.serverErrorMessages = 'Something went wrong. Please contact admin.'
        }
      );

    })
  }
  saveToDbLRC() {
    this.saveToDbTCNASC();
    this.currentAnswersForLRC.forEach(x => {
      this.answerService.saveAnswers(x).subscribe(
        res => {
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 4000);
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>')
          }
          else
            this.serverErrorMessages = 'Something went wrong. Please contact admin.'
        }
      );

    })
  }

  ngOnInit() {

    //currently logged in user id
    this.userId = this.questionService.getUserInfo();

    //retrieving ques and count of no.of ques in each category
    this.questionService.getQuestions().subscribe((res) => {
      this.questions = res;
      this.questions.forEach(q => {
        if (q.questionCategory === 'OPERATIONAL CONTROLS') {
          this.noOfOCQuestions++
        }
        else if (q.questionCategory === 'TECHNICAL CONTROLS - SYSTEMS') {
          this.noOfTCSQuestions++
        }
        else if (q.questionCategory === 'TECHNICAL CONTROLS – NETWORKS, APPLICATIONS, SERVICES and THE CLOUD') {
          this.noOfTCNASCQuestions++
        }
        else if (q.questionCategory === 'LEGAL AND REGULATORY CONTROLS') {
          this.noOfLRCQuestions++
        }

      });
    });
    //getting answers 
    this.answerService.getAnswers().subscribe((res) => {
      this.answersFromAPI = res;
    });
    console.log(this.chartServ.getAnswersfromApi())
  }
}
