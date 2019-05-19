import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router) { }
  signOut(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/loginPage');
  }
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {}
    );
  }
}
