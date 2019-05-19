import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthGuard} from './auth/auth.guard'
import { SurveyComponent } from './survey/survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';

 export const routes: Routes = [
  {
    path: '', 
    component: MainPageComponent
  },
  {
    path: 'loginPage', 
    component: LoginPageComponent,
  },
  {
    path: 'userPage',
    component: UserPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'loginPage/signUp',
    component: SignUpComponent
  },
  {
    path: 'survey',
    component: SurveyComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
