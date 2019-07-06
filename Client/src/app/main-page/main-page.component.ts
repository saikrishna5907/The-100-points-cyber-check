import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {OwlOptions} from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor() { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
    },
    768: {
        items: 2
    },
    992: {
        items: 3
    }
    },
    nav: true
  }
  ngOnInit() {
  //   $('.owl-carousel').owlCarousel({
  //     navigation: true,
  //     margin: 30,
  //     responsive: {
  //         0: {
  //             items: 1
  //         },
  //         768: {
  //             items: 2
  //         },
  //         992: {
  //             items: 3
  //         }
  //     }
  // });
  }

}
