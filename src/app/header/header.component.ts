import { Component, OnInit } from '@angular/core';
import { EventemitterService } from '../eventemitter.service';
import * as $ from 'jquery';
import anime from 'animejs/lib/anime.es';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private eventEmitterService: EventemitterService) {

  }

  ngOnInit() {
    //wrap any logo letter with span element to animate it separately
    $('.ml3').each(function () {
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    var logo = anime.timeline({ autoplay: true });
    logo.add({
      targets: '.ml3 .letter',
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 2250,
      delay: function (el, i) {
        return 150 * (i + 1)
      }
    });
    logo.play();
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
