import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserService} from '../shared/user.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-side-nav',
  templateUrl: './user-side-nav.component.html',
  styleUrls: ['./user-side-nav.component.css']
})
export class UserSideNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private userService: UserService, private router: Router) {}

  signOut(){
    this.userService.deleteToken();
    this.router.navigateByUrl('#');
  }
}
