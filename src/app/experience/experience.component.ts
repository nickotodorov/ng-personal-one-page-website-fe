import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ScrollerService } from '../scroller.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide', style({
        opacity: 0,
        transform: "translateX(-50%)"
      })),
      transition('show => hide', animate('400ms ease-out')),
      transition('hide => show', animate('900ms ease-in'))
    ])
  ]
})

export class ExperienceComponent implements OnInit {
  Experience: string[];
  state = 'hide'

  constructor(
    public el: ElementRef,
    private scroller: ScrollerService,
    private data: DataService
  ) {

  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.scroller.checkScroll(this);
  }
  ngOnInit() {
    this.data.getExperience().subscribe(
      data => {
        this.Experience = data as string[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

}
