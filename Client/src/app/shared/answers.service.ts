import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Answer} from '../shared/answer.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private http: HttpClient) { }

  saveAnswers(answer: Answer): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/answers', answer);
  }
  getAnswers(): Observable<any>{
    return this.http.get(environment.apiBaseUrl + '/answers');
  }
}
