import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BucketComponent } from '../pages/bucket/bucket.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { MyProfileComponent } from '../pages/my-profile/my-profile.component';
import { guardGuard } from 'src/app/core/guard/guard.guard';
import { BucketItemsComponent } from '../pages/bucket-items/bucket-items.component';
import { UpdateBacketComponent } from 'src/app/shared/component/update-backet/update-backet.component';

export const layoutRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
       
      },
      { path: 'bucket', component: BucketComponent, },
      // {
      //   path: 'profile',
      //   component: MyProfileComponent,
        
      // },
      {
        path: 'update-bucket/:bucketId',
        component: UpdateBacketComponent,
        canActivate: [guardGuard],
      },
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
