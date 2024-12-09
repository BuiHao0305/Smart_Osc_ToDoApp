import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangeLanguagesComponent } from '../../../shared/component/change-languages/change-languages.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterModule,

    ChangeLanguagesComponent,
    TranslateModule,
  ],
})
export class HeaderComponent implements OnInit{
  today: Date = new Date();
  dayOfWeek = '';
  formattedDate = '';

  ngOnInit(): void {
    this.formatDate();
  }

  formatDate(): void {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long' };
    this.dayOfWeek = this.today.toLocaleDateString('en-US', { weekday: 'long' });
    this.formattedDate = this.today.toLocaleDateString('en-GB', options); 
  }

}
