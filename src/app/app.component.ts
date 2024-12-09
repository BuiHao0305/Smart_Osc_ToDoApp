import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'TodoApp';
  constructor() // private authService: AuthServiceService,
  // private router: Router,
  // @Inject(PLATFORM_ID) private platformId: string
  {}
  ngOnInit(): void {}
  checkTokenAndRedirect(): void {
    // if (isPlatformBrowser(this.platformId)) {
    //   const token = localStorage.getItem('access_token');
    //   if (token && this.authService.isTokenValid(token)) {
    //     const currentUrl = this.router.url;
    //     if (currentUrl === '/sign-in') {
    //       this.router.navigate(['layout/dashboard']);
    //     }
    //   } else {
    //     const currentUrl = this.router.url;
    //     if (currentUrl !== '/sign-in' && currentUrl !== '/sign-up') {
    //       this.router.navigate(['/sign-in']);
    //     }
    //   }
    // }
  }
}
