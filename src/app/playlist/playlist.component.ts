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
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
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
export class PlaylistComponent implements OnInit {
  state = 'hide'

  Playlist: string[];
  Tracks: string[];
  constructor(
    public el: ElementRef, 
    private scroller: ScrollerService, 
    private randomizer: RandomizerService,
    private data: DataService
    ) { 
      
    }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.scroller.checkScroll(this);
  }

  generateRandomTracks(input: string[]) {
    return this.randomizer.randomizeArray(input);
  }

  ngOnInit() {
    this.data.getPlaylist().subscribe(
      data => {
        this.Playlist = data as string[];
        this.Tracks = this.generateRandomTracks(this.Playlist['Tracks']);

      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

}
