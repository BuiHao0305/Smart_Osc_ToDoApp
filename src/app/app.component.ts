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
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          localStorage.setItem('lastVisitedUrl', event.url);
        
        }
      });
    }
    
    
  }
  
  
}