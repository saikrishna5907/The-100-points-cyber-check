import { Injectable } from '@angular/core';
import {AnswersService} from '../shared/answers.service'
import {environment} from '../../environments/environment'
import {Answer} from '../shared/answer.model'
import {QuestionService} from '../shared/question.service'
@Injectable({
  providedIn: 'root'
})
export class ChartsDataService {
  answers:Array<Answer>
  constructor(private ansService:AnswersService, private queService: QuestionService) { }
  getAnswersfromApi(){
   
    console.log(this.answers)
  }

}
