import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private userService: UserService, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.userService.isLoggedIn()){
        this.router.navigateByUrl('/loginPage');
        this.userService.deleteToken();
        return false;
      }
      return true;
    }
  
}
