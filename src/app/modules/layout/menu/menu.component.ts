import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
  standalone:true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class MenuComponent  {
  @Input() sideNavStatus = false;
  menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Dashboard',
      icon: 'bi bi-house',
      route: '/layout/dashboard',
    },
    {
      id: 2,
      name: 'Profile',
      icon: 'bi bi-calendar',
      route: '/layout/profile',
    },
    { id: 3, name: 'To do list', icon: 'bi bi-list-check', route: '/layout/bucket' },
   
    // { id: 5, name: 'Add Subject', icon: 'bi bi-plus' },
    // { id: 6, name: 'Chat', icon: 'bi bi-chat' },
    // { id: 7, name: 'Budget', icon: 'bi-wallet' },
    // { id: 9, name: 'Logout', icon: 'bi bi-box-arrow-in-right' },
  ];
  constructor(private router: Router,) { }

  navigate(route?: string) {
    if (route) {
      this.router.navigate([route]);
    }
  }

}
