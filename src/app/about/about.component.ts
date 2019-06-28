import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
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
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
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


export class AboutComponent implements OnInit {
  state = 'hide'
  UserMetaData: string[];
  BackendSkills: string[];
  FrontendSkills: string[];
  Tools: string[];
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

  generateRandomSkills(input: string[]) {
    return this.randomizer.randomizeArray(input);
  }

  ngOnInit() {

    this.data.getAbout().subscribe(
      data => {
        this.UserMetaData = data as string[];
        this.BackendSkills = this.generateRandomSkills(this.UserMetaData['Skills'][1].BackEnd);
        this.FrontendSkills = this.generateRandomSkills(this.UserMetaData['Skills'][0].FrontEnd);
        this.Tools = this.generateRandomSkills(this.UserMetaData['Skills'][2].Tools);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

  }

}
