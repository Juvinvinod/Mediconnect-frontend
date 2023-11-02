import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isCollapsed = true;
  constructor(private sharedService: SharedService) {}
  collapse() {
    this.sharedService.collapse();
    this.isCollapsed = this.sharedService.isCollapsed;
  }
}
