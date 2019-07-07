import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js';
import { AnswersService } from '../shared/answers.service';
import { QuestionService } from '../shared/question.service';
import { Question } from '../shared/question.model';
import { AnswersOfUserService } from '../shared/answers-of-user.service';
import { UserService } from '../shared/user.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    mainGraphData: any;
    getSingleQues: Question;
    answers: any;
    questions: any;
    chart: any;
    barChart: any;
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
    correctAnsPercentage(noOfCorrectAnswers: any) {

        return (noOfCorrectAnswers / 25) * 100;
    }
    graphData(): any {
        this.ansOfUser.getAnswersOfUser().subscribe(res => {
            console.log(res[0].user_Id)
            if (res[0].user_Id === this.userService.getUserPayload()._id) {
                this.mainGraphData = res;
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
            let valueOfOC = 100 - this.correctAnsPercentage(this.mainGraphData[0].answers[0].noOfYesInOC);
            let valueOfTCS = 100 - this.correctAnsPercentage(this.mainGraphData[0].answers[1].noOfYesInTCS);
            let valueOfTC_NASC = 100 - this.correctAnsPercentage(this.mainGraphData[0].answers[2].noOfYesInTCNASC);
            let valueOfLRC = 100 - this.correctAnsPercentage(this.mainGraphData[0].answers[3].noOfYesInLRC);
            //    console.log(graphData);


            let gradientChartOptionsConfiguration = {
                layout: {
                    padding: {
                      left: 20,
                      right: 20,
                      top: 10,
                      bottom: 0
                    }
                  },
                  maintainAspectRatio: false,
                  tooltips: {
                    backgroundColor: '#fff',
                    titleFontColor: '#333',
                    bodyFontColor: '#666',
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest"
                  },
                  legend: {
                    position: "bottom",
                    fillStyle: "#FFF",
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        fontColor: "#09303d",
                        fontStyle: "bold",
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        padding: 10
                      },
                      gridLines: {
                        drawTicks: true,
                        drawBorder: false,
                        display: true,
                        color: "rgba(255,255,255,0.1)",
                        zeroLineColor: "transparent"
                      }
          
                    }],
                    xAxes: [{
                        gridLines: {
                          zeroLineColor: "transparent",
                          drawTicks: false,
                          display: false,
                          drawBorder: false
                        },


                    //   gridLines: {
                    //     zeroLineColor: "transparent",
                    //     display: false,
                        
                    //   },
                      ticks: {
                        padding: 10,
                        fontColor: "white",
                        fontStyle: "bold"
                      }
                    }]
                  }
            }
            var canvas = <HTMLCanvasElement>document.getElementById('bigDashBoardChart')
            var ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
            let chartColor = "#FFFFFF";
            let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
            gradientStroke.addColorStop(0, '#80b6f4');
            gradientStroke.addColorStop(1, chartColor);

            let gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
            // var ctx = canvas.getContext("2D");
            this.barChart = new Chart(ctx, {
                type: 'line',
                responsive: true,
                data: {
                    labels: ["OC", "TC- S", "TC- NASC", "LRC"],
                    datasets: [{
                        label: 'Risk Percentage',
                        borderColor: chartColor,
                        pointBorderColor: chartColor,
                        pointBackgroundColor: "#1e3d60",
                        pointHoverBackgroundColor: "#1e3d60",
                        pointHoverBorderColor: chartColor,
                        pointBorderWidth: 2,
                        pointHoverRadius: 7,
                        pointHoverBorderWidth: 2,
                        pointRadius: 5,
                        fill: true,
                        backgroundColor: gradientFill,
                        borderWidth: 2,
                        data: [valueOfOC, valueOfTCS, valueOfTC_NASC, valueOfLRC]
                    }]
                },
                options: gradientChartOptionsConfiguration
            });
        });


    }

}
