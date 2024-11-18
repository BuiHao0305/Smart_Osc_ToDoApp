import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { LogoutDialogComponent } from 'src/app/shared/component/logout-dialog/logout-dialog.component';
import { MyProfileComponent } from '../../pages/my-profile/my-profile.component';
import { Store } from '@ngrx/store';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ChangeLanguagesComponent } from '../../../shared/component/change-languages/change-languages.component';
import { authActions } from 'src/app/core/store/auth/auth.action';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule, MyProfileComponent, ChangeLanguagesComponent],
})
export class HeaderComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus = false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private store: Store,
    private authService: AuthServiceService
  ) {}

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  logoutUser() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(authActions.logOut());
        this.router.navigate(['/sign-in']);
        this.authService.clearToken()
        this.snackbar.show('Đăng xuất thành công');
      }
    });
  }
}
