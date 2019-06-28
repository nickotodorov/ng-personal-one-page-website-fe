import { Component, OnInit } from '@angular/core';
import { EventemitterService } from '../eventemitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private eventEmitterService: EventemitterService) {

  }

  ngOnInit() {
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeFirstComponentFunction.subscribe((name: string) => {
          this.setNav();
        });
    }
  }

  setNav() {
    this.removeCurrentNavItem();
    this.addCurrentNavItem(this.eventEmitterService.getCurrentSection());
  }

  removeCurrentNavItem() {
    const currentHeaderNavLinks = document.querySelectorAll("#mainNav li.active");
    [].forEach.call(currentHeaderNavLinks, function (el: any) {
      el.classList.remove("active");
    });
  }

  addCurrentNavItem(section: string) {
    document.querySelectorAll('#mainNav li a[data-section="' + section + '"]')[0].closest('li').classList.add("active");
  }

}
