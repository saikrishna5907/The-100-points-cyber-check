import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../shared/user.service';
import {NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{3,8}$';
  hide = true;
  showSuccessMessage: boolean;
  serverErrorMessages: String;

  constructor( private userService: UserService, private router: Router) { }

  // signUp(firstName: String,lastName: String,email:  String,companyName:  String,password:  String){

  // }
  ngOnInit() {
  }
  
  onSubmit(form: NgForm){
    this.userService.postUser(form.value).subscribe(
      
      res => {
        this.showSuccessMessage =true;
        setTimeout(() =>this.showSuccessMessage =false,4000);
        this.resetForm(form);
        this.router.navigateByUrl('/loginPage');
      },
      err => {
        if(err.status === 422){
          this.serverErrorMessages = err.error.join ('<br/>')
        }
        else
          this.serverErrorMessages = 'Something went wrong. Please contact admin.'
      }
    );  
    console.log(form.value);
  }

  resetForm(form: NgForm){
    this.userService.selectedUser={
      firstName:'',
      lastName:'',
      email:'',
      companyName:'',
      password:''
    };
    form.resetForm();
    this.serverErrorMessages='';
  }
}