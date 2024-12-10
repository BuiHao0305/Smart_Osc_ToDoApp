import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { isPlatformBrowser } from '@angular/common';
import { UrlService } from './core/service/urlService';
import { AuthServiceService } from './services/auth-service.service';

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
    private authService:AuthServiceService,
    private urlService: UrlService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
    
  //     this.router.events.subscribe((event) => {
  //       if (event instanceof NavigationEnd) {
  //         localStorage.setItem('lastVisitedUrl', event.url);
  //         console.log('Saved lastVisitedUrl:', event.url);
          
       
  //         this.checktoken();
  //       }
  //     });
  //   }
  // }

  // checktoken() {
  //   const token = localStorage.getItem('access_token');
  //   if (token || this.authService.isTokenValid(token)) {
  //     const lastVisitedUrl = localStorage.getItem('lastVisitedUrl');
  //     if (lastVisitedUrl) {
  //       this.router.navigateByUrl(lastVisitedUrl);
  //     } else {
  //       this.router.navigate(['layout/dashboard']);
  //     }
  //   }
  // }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkTokenAndRedirect();
      }
    });
  }
  checkTokenAndRedirect(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      if (token && this.authService.isTokenValid(token)) {
        const currentUrl = this.router.url;
        if (currentUrl === '/sign-in') {
          this.router.navigate(['layout/dashboard']);
        }
      } else {
        const currentUrl = this.router.url;
        if (currentUrl !== '/sign-in' && currentUrl !== '/sign-up') {
          this.router.navigate(['/sign-in']);
        }
      }
    }
  }
}