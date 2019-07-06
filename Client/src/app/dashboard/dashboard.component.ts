import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js';
import { AnswersService } from '../shared/answers.service';
import { QuestionService } from '../shared/question.service';
import { Question } from '../shared/question.model';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    riskOfOC = 0.0
    noOfYesInOC = 1
   noOfNoInOC = 0
    getSingleQues: any
    answers: any;
    questions: any;
    chart: any;
    barChart: any;
    PieChart: any;
    constructor(private ansService: AnswersService, private quesService: QuestionService) { 
        this.ansService.getAnswers().subscribe(res =>{
            this.answers =res 
        this.answers.forEach(element => {
            this.quesService.getQuestionWithQID(element.question_Id).subscribe(res => {
                this.getSingleQues = res;
                if (this.getSingleQues.questionCategory === 'OPERATIONAL CONTROLS' && element.answerforQ_IdU_Id === 1) {
                    this.noOfYesInOC++;
                }
            })
            
        });
       
    })
    }

    ngOnInit() {
        this.ansService.getAnswers().subscribe(res => {
            this.answers = res;
            console.log(this.noOfYesInOC)
            console.log(this.answers)
            // this.quesService.getQuestions().subscribe(res => {
            //     this.questions =res
            // })

            

            this.barChart = new Chart('barChart', {
                type: 'bar',
                data: {
                    labels: ["OPERATIONAL CONTROLS", "TECHNICAL CONTROLS - SYSTEMS", "TECHNICAL CONTROLS – NETWORKS, APPLICATIONS, SERVICES and THE CLOUD'", "LEGAL AND REGULATORY CONTROLS"],
                    datasets: [{
                        label: 'Risk Percentage',
                        data: [this.noOfYesInOC, 7, 3, 5, 2, 10],
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
