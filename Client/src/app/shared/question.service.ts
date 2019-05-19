import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';
import {Question} from './question.model';
import {UserService} from '../shared/user.service';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  qns: any[];
  qnProgress: number;
  questionName: Question;
  currentQueston : Question = {
    _id: '',
    question : '',
    questionCategory : '',
    questionType: '',
    options: null
  };

  constructor(private http: HttpClient, private userService: UserService) { }


  getQuestionWithQID(id: String){
    return this.http.get(environment.apiBaseUrl + '/questions/'+id)
  }
  
  getUserInfo(){
    return this.userService.getUserPayload()._id;
  }

  //http crud methods
  getQuestions() {
    return this.http.get(environment.apiBaseUrl +'/questions');
  }
  postQuestion (question: Question){
    return this.http.post(environment.apiBaseUrl + '/questions', question);  
  }
  updateQuestion (question: Question) {
    return this.http.put(environment.apiBaseUrl + '/questions',question);
  }
}
