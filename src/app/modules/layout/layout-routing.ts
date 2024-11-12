import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BucketComponent } from '../pages/bucket/bucket.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { MyProfileComponent } from '../pages/my-profile/my-profile.component';

export const layoutRoutes: Route[] = [
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: 'bucket', component: BucketComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: MyProfileComponent },
    ],
  },
];
