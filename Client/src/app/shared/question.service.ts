import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';
import {Question} from './question.model';
import {UserService} from '../shared/user.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionService{
  
  constructor(private http: HttpClient, private userService: UserService) { }

  
  getQuestionWithQID(id: String): Observable<Question>{
    return this.http.get<Question>(environment.apiBaseUrl + '/questions/'+id)
  }
  getQuestionCategory(question: Question){
    return question.questionCategory
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
