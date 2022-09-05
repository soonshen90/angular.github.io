import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sample';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {}
  ngOnInit(): void {
      this.router.events.pipe().subscribe(()=> {
        const rt = this.getChild(this.activatedRoute);
        rt.data.subscribe(data => {
          this.titleService.setTitle(data.title);
        });
      });
  }
  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }else {
      return activatedRoute;
    }
  }
}
