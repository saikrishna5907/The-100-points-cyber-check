import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AnswersOfUser} from './answersOfUser.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AnswersOfUserService {

  constructor(private http: HttpClient) { }

  getAnswersOfUser(){
    return this.http.get<AnswersOfUser>(environment.apiBaseUrl + '/answersOfUser');
  }

}
