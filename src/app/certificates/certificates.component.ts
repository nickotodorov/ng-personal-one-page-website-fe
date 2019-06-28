import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { RandomizerService } from '../randomizer.service';    
import { ScrollerService } from '../scroller.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide', style({
        opacity: 0,
        transform: "translateX(50%)"
      })),
      transition('show => hide', animate('400ms ease-out')),
      transition('hide => show', animate('900ms ease-in'))
    ])
  ]
})

export class CertificatesComponent implements OnInit {
  state = 'hide'

  Certificates: string[];
  Courses: string[];
  
  constructor(
    public el: ElementRef,
    private randomizer: RandomizerService,
    private scroller: ScrollerService,
    private data: DataService
  ) {

  }  
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.scroller.checkScroll(this);
  }
  
  generateRandomCourses(input: string[]) {
    return this.randomizer.randomizeArray(input);
  }

  ngOnInit() {
    this.data.getCertificates().subscribe(
      data => {
        this.Certificates = data as string[];
        this.Courses = this.generateRandomCourses(this.Certificates['udemy']);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
