import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ZainCashCMS';
  showMasterPage: boolean = false;
  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    router.events.subscribe(event => {

      if (event instanceof NavigationStart) {

      }
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        if (event.url.includes("/login")) {
          this.showMasterPage = false;
        }
        else {
          this.showMasterPage = true;
        }
      }
    });

  }

  ngOnInit() {

  }

 
}
