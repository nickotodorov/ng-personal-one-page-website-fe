import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Title],
})
export class AppComponent {
  
  public constructor(private title: Title) {
    this.setTitle('Nik Todorov - Software Developer & QA enthusiast');
  }

  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

}
