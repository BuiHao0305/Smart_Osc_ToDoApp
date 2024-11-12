import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class HeaderComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus = false;
  constructor(private router: Router) {}

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  logout() {
    this.router.navigate(['/sign-in']);
  }
}
