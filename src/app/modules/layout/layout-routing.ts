import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BucketComponent } from '../pages/bucket/bucket.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { MyProfileComponent } from '../pages/my-profile/my-profile.component';
import { guardGuard } from 'src/app/core/guard/guard.guard';
import { BucketItemsComponent } from '../pages/bucket-items/bucket-items.component';

export const layoutRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [guardGuard],
      },
      { path: 'bucket', component: BucketComponent, canActivate: [guardGuard] },
      {
        path: 'profile',
        component: MyProfileComponent,
        canActivate: [guardGuard],
      },
      // {
      //   path: 'update-bucket/:bucketId',
      //   component: UpdateBacketComponent,
      //   canActivate: [guardGuard],
      // },
      {
        path: 'bucket-items/:bucketId',
        component: BucketItemsComponent,
        canActivate: [guardGuard],
      },
      // {
      //   path: 'bucket/:bucketId/items/:itemId',
      //   component: UpdateItemsComponent,
      //   canActivate: [guardGuard],
      // },
    ],
  },
];
