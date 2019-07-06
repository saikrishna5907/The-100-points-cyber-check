import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {routes} from './app-routing.module';

// angular material imports
import { MatInputModule, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatRadioModule, MatProgressBarModule, MatTableModule } from '@angular/material';
import {MatSelectModule, MatTabsModule, MatSliderModule, MatToolbarModule,MatStepperModule, MatSidenavModule, MatListModule } from '@angular/material';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from './shared/user.service';
import {AuthInterceptor} from './auth/auth.interceptor';
import {AuthGuard} from './auth/auth.guard';
import { UserSideNavComponent } from './user-side-nav/user-side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SurveyComponent } from './survey/survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionService } from './shared/question.service';
import {AnswersService} from './shared/answers.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainpageheaderComponent } from './mainpageheader/mainpageheader.component';
import { ChartsDataService } from './shared/charts-data.service';
import { AnswersOfUserService } from './shared/answers-of-user.service';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    SignUpComponent,
    UserSideNavComponent,
    SurveyComponent,
    DashboardComponent,
    MainpageheaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatMenuModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatSliderModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    LayoutModule,
    CarouselModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
     UserService,
     QuestionService,
     AnswersService,
     ChartsDataService,
     AnswersOfUserService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
