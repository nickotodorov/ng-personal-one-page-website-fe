import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  constructor() { }

  randomizeArray(input: string[]) {
    var ctr = input.length, temp, index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = input[ctr];
      input[ctr] = input[index];
      input[index] = temp;
    }
    return input;
  }
}
