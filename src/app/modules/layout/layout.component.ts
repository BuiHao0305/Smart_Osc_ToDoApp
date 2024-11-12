import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    RouterModule,
    FormsModule,
    CommonModule,
  ],
})
export class LayoutComponent {
  sideNavStatus = false;
}
