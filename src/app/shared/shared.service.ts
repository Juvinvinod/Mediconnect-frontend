import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isCollapsed = true;
  // constructor() {}

  //function to add toggle on navbar
  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
