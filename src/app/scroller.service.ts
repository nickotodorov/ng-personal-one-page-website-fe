import { Injectable } from '@angular/core';
import { EventemitterService } from './eventemitter.service';
import { ScrollHistory } from './models/scrollhistory.model';

@Injectable({
  providedIn: 'root'
})

export class ScrollerService {
  startSectionSelector: string = 'app-header';
  lastNavSectionSelector: string = 'app-header';
  historyCollection: Array<ScrollHistory> = [];
  lastScrollTop: number = 0;

  constructor(
    private eventEmitterService: EventemitterService,
    public history: ScrollHistory
  ) {

  }

  checkScroll(context) {
    const componentPosition = context.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    const padding = 350;
    let currentScroll = new ScrollHistory();
    currentScroll.isShown = true;
    currentScroll.name = context.el.nativeElement.localName;
    currentScroll.componentPositionPixels = context.el.nativeElement.offsetTop;
    this.historyCollection = this.historyCollection.slice(-10);
    if (this.lastScrollTop > scrollPosition + padding) {
      for (var k in this.historyCollection) {
        if (currentScroll.name == this.historyCollection[k].name) {
          let id = <any>k - 1 > 0 ? <any>k - 1 : 0;
          if (scrollPosition < this.historyCollection[k].componentPositionPixels) {
            this.eventEmitterService.setCurrentSection(this.historyCollection[id].name);
            this.eventEmitterService.onDocumentScroll();
          }
        }
      }
    } else {
      if (scrollPosition >= (componentPosition - padding)) {
        if (this.lastNavSectionSelector != context.el.nativeElement.localName && context.el.nativeElement != undefined) {
          context.state = 'show';
          this.eventEmitterService.setCurrentSection(currentScroll.name);
          this.eventEmitterService.onDocumentScroll();
          this.lastNavSectionSelector = context.el.nativeElement.localName;
          this.historyCollection.push(currentScroll);
        }
      }
    }
    this.lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
    if (scrollPosition < padding) {
      this.eventEmitterService.setCurrentSection(this.startSectionSelector);
      this.eventEmitterService.onDocumentScroll();
    }
    return context.state;
  }

}
