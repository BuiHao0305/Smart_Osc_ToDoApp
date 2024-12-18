import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'TodoApp';
  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  // ngOnInit(): void {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.checkTokenAndRedirect();
  //     }
  //   });
  // }
  // checkTokenAndRedirect(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const token = localStorage.getItem('access_token');
  //     if (token && this.authService.isTokenValid(token)) {
  //       const currentUrl = this.router.url;
  //       if (currentUrl === '/sign-in') {
  //         this.router.navigate(['layout/dashboard']);
  //       }
  //     } else {
  //       const currentUrl = this.router.url;
  //       if (currentUrl !== '/sign-in' && currentUrl !== '/sign-up') {
  //         this.router.navigate(['/sign-in']);
  //       }
  //     }
  //   }
  // }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          localStorage.setItem('lastVisitedUrl', event.urlAfterRedirects);
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
