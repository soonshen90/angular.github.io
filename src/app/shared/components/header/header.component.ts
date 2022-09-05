import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private titleService: Title) {}
  getTitle() {
    var title = this.titleService.getTitle();
    return (title==='Sample' ? 'Login' : title)
  }
}
