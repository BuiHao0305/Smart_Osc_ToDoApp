import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MENU_ITEMS } from './navbar.layout';

interface MenuItem {
  id: number;
  name: string;
  icon: string;
  route?: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,TranslateModule],
})
export class MenuComponent {
  @Input() sideNavStatus = false;
  menuItems: MenuItem[] = MENU_ITEMS; 
  constructor(private router: Router) {}

  navigate(route?: string) {
    if (route) {
      this.router.navigate([route]);
    }
  }
}
