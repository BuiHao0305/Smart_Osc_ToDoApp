import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { LogoutDialogComponent } from 'src/app/shared/component/logout-dialog/logout-dialog.component';
import { MyProfileComponent } from '../../pages/my-profile/my-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule, MyProfileComponent],
})
export class HeaderComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus = false;
  constructor(private router: Router, private dialog: MatDialog) {}

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  logout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
