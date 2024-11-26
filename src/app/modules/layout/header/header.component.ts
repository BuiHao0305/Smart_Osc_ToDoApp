import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { LogoutDialogComponent } from 'src/app/shared/component/logout-dialog/logout-dialog.component';
import { MyProfileComponent } from '../../pages/my-profile/my-profile.component';
import { Store } from '@ngrx/store';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ChangeLanguagesComponent } from '../../../shared/component/change-languages/change-languages.component';
import { authActions } from 'src/app/core/store/auth/auth.action';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/page/user.service';
import { Observable } from 'rxjs';
import { selectUserInfo } from 'src/app/core/store/auth/auth.selectors';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule, MyProfileComponent, ChangeLanguagesComponent,TranslateModule],
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  username: string = '';
  menuStatus = false;
  avatarUrl: string | null = null;
  userInfo$: Observable<any>;
  @Inject(PLATFORM_ID) private platformId: string | undefined
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private store: Store,
    private authService: AuthServiceService,
    private userService: UserService
      
  ) {
    this.userInfo$ = this.store.select(selectUserInfo);
  }

  ngOnInit(): void {
    this.updateAvatar();
    this.userService.avatarUpdated$.subscribe(() => {
      this.updateAvatar();
    });

    this.userInfo$.subscribe((userInfo) => {
      if (userInfo) {
        this.username = userInfo.username;
      }
    });

    if (isPlatformBrowser(this.platformId!)) {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        this.username = parsedUserInfo.username;
      }
    }
  }

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
        this.authService.clearToken();
        this.snackbar.show('Đăng xuất thành công');
      }
    });
  }

  updateAvatar() {
    this.userService.getAvatar().subscribe((response) => {
      this.avatarUrl = response;
    });
  }
}
