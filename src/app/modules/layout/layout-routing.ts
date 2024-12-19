import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BucketComponent } from '../pages/bucket/bucket.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { BucketItemsComponent } from '../pages/bucket-items/bucket-items.component';
import { UpdateBacketComponent } from 'src/app/shared/component/update-backet/update-backet.component';
import { CustomTimepickerComponent } from 'src/app/shared/custom-component/custom-timepicker/custom-timepicker.component';
import { CustomButtonComponent } from 'src/app/shared/custom-component/custom-button/custom-button.component';
import { CustomStatusComponent } from 'src/app/shared/custom-component/custom-status/custom-status.component';
import { CustomInputComponent } from 'src/app/shared/custom-component/custom-input/custom-input.component';

export const layoutRoutes: Route[] = [
  {
    path: '',
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
        path: 'status',
        component: CustomInputComponent,
      },
    ],
  },
];
