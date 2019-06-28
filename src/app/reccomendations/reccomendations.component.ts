import { Component, Input, OnInit } from '@angular/core';

type PaneType = 'left' | 'right';
@Component({
  selector: 'app-reccomendations',
  templateUrl: './reccomendations.component.html',
  styleUrls: ['./reccomendations.component.css']
})
export class ReccomendationsComponent implements OnInit {

  constructor() { }
  @Input() activePane: PaneType = 'left';

  ngOnInit() {
  }

}
