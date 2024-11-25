import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AuthServiceService } from './services/auth-service.service';
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
    private authService: AuthServiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}
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
