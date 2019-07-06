import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';


import {UserService} from '../shared/user.service'
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  serverErrorMessages: string;
  model = {
    email: '',
    password:''
  }
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{3,8}$';
  hide = true;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if(this.userService.isLoggedIn())
      this.router.navigateByUrl('/dashboard');
  }


  onSubmit(form: NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
         this.serverErrorMessages = err.error.message;
      });
  }
}
