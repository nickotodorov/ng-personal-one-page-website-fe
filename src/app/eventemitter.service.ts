import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})

export class EventemitterService {

  currentScroll: string;
  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  public setCurrentSection(currentScroll: string) {
    this.currentScroll = currentScroll;
  }

  public getCurrentSection() {
    return this.currentScroll;
  }

  onDocumentScroll() {
    this.invokeFirstComponentFunction.emit();
  }
}
