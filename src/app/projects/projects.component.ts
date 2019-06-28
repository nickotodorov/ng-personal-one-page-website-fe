import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';

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
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
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
export class ProjectsComponent implements OnInit {

  state = 'hide'
  Projects: string[];
  WebProjects: string[];

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

  generateRandomWebProjects(input: string[]) {
    return this.randomizer.randomizeArray(input);
  }

  ngOnInit() {
    this.data.getProjects().subscribe(
      data => {
        this.Projects = data as string[];
        this.WebProjects = this.generateRandomWebProjects(this.Projects['Projects']);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

}
