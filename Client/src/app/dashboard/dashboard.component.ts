import { Component, OnInit, Injectable } from '@angular/core';

import Chart from 'chart.js';
import { AnswersService } from '../shared/answers.service';
import { QuestionService } from '../shared/question.service';
import { Question } from '../shared/question.model';
import { Subscription } from 'rxjs';
import {AnswersOfUserService} from '../shared/answers-of-user.service';
import { UserService } from '../shared/user.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    nofz: Subscription;
    riskOfOC = 0.0;
    noOfYesInOC = 0;

   noOfNoInOC = 0;
   mainGraphData : any;
    getSingleQues: Question;
    answers: any;
    questions: any;
    chart: any;
    barChart: any;
    PieChart: any;
    constructor(private ansService: AnswersService,
         private quesService: QuestionService, 
         private ansOfUser: AnswersOfUserService,
         private userService: UserService
         ) { 
             this.graphData();
    }

    
    // to get the question when question id given
    // getQuestion(id: any): Question{
    //    let que: Question;
    //     this.quesService.getQuestionWithQID(id).subscribe(res => {
           
    //       que =  new Question(res._id, res.question, res.questionCategory, res.questionType,res.options)
    //     });
    //     return que;
    // }
    correctAnsPercentageForOC(noOfCorrectAnswers: any){
        
        return (noOfCorrectAnswers/25)*100;
    }
    graphData(): any{
        this.ansOfUser.getAnswersOfUser().subscribe(res => {
            console.log(res[0].user_Id)
            if( res[0].user_Id === this.userService.getUserPayload()._id){
                this.mainGraphData =  res;
            }
        })  
    }

    ngOnInit() {
        this.ansService.getAnswers().subscribe(res => {
            this.answers = res;
            // this.quesService.getQuestions().subscribe(res => {
            //     this.questions =res
            // })          
           console.log(this.mainGraphData);
           let valueOfOC = this.mainGraphData[0].answers[0].noOfYesInOC;
           let valueOfTCS= this.mainGraphData[0].answers[1].noOfYesInTCS
           let valueOfTC_NASC = this.mainGraphData[0].answers[2].noOfYesInTCNASC;
           let valueOfLRC = this.mainGraphData[0].answers[3].noOfYesInLRC;
        //    console.log(graphData);
            this.barChart = new Chart('barChart', {
                type: 'bar',
                data: {
                    labels: ["OC", "TC- S", "TC- NASC", "LRC"],
                    datasets: [{
                        label: 'Risk Percentage',
                        data: [ valueOfOC,valueOfTCS,valueOfTC_NASC,valueOfLRC],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    title: {
                        text: "Bar Chart",
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        });

        
    }

}
