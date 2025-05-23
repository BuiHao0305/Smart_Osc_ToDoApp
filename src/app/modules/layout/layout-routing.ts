import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BucketComponent } from '../pages/bucket/bucket.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { BucketItemsComponent } from '../pages/bucket-items/bucket-items.component';
import { UpdateBacketComponent } from 'src/app/shared/component/update-backet/update-backet.component';
import { TestComponent } from '../pages/test/test.component';

export const layoutRoutes: Route[] = [
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'bucket', component: BucketComponent },

      {
        path: 'update-bucket/:bucketId',
        component: UpdateBacketComponent,
      },
      {
        path: 'bucket-items/:bucketId',
        component: BucketItemsComponent,
      },
      {
        path: 'test',
        component: TestComponent,
      },
    ],
  },
];
