import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'TodoApp';
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          localStorage.setItem('lastVisitedUrl', event.url);
        }
      });
      const lastVisitedUrl = localStorage.getItem('lastVisitedUrl');
      if (lastVisitedUrl) {
        this.router.navigateByUrl(lastVisitedUrl);
      } else {
        this.router.navigate(['layout/dashboard']);
      }
    }
  }
}
