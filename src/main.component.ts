// import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { Router } from '@angular/router';
// import { isPlatformBrowser } from '@angular/common';
// import { AuthServiceService } from './app/services/auth-service.service';


// @Component({
//   standalone: true,
//   selector: 'app-main',
//   template: '', 
// })
// export class MainComponent implements OnInit {
  
//     constructor(
//       private router: Router,
//       private authService: AuthServiceService,
//       @Inject(PLATFORM_ID) private platformId: any
//     ) {}
  
//     ngOnInit(): void {
//       if (isPlatformBrowser(this.platformId)) {
//         this.checkToken(); 
//       }
//     }
  
//     checkToken() {
//       const token = localStorage.getItem('access_token');
//       if (token || this.authService.isTokenValid(token)) {
//         const lastVisitedUrl = localStorage.getItem('lastVisitedUrl');
//         if (lastVisitedUrl) {
//           this.router.navigateByUrl(lastVisitedUrl);
//         } else {
//           this.router.navigate(['layout/dashboard']);
//         }
//       }
//     }
//   }
