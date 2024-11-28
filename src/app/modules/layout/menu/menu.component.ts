import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,

  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MENU_ITEMS } from './navbar.layout';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { Store } from '@ngrx/store';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/page/user.service';
import { selectUserInfo } from 'src/app/core/store/auth/auth.selectors';
import { LogoutDialogComponent } from 'src/app/shared/component/logout-dialog/logout-dialog.component';
import { authActions } from 'src/app/core/store/auth/auth.action';
import { MyProfileComponent } from "../../pages/my-profile/my-profile.component";

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
  imports: [FormsModule, CommonModule, RouterModule, TranslateModule, MyProfileComponent],
})
export class MenuComponent {
  @Input() sideNavStatus = false;
  menuItems: MenuItem[] = MENU_ITEMS;
  username = '';
  usergmail ='';
  avatarUrl: string | null = null;
  userInfo$: Observable<any>;
  showChild = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private store: Store,
    private authService: AuthServiceService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: string | undefined
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
        this.usergmail = userInfo.email;
      }
    });

    if (isPlatformBrowser(this.platformId!)) {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        this.username = parsedUserInfo.username || '';
        this.usergmail = parsedUserInfo.email || '';
      }
    }
  }
  navigate(route?: string) {
    if (route) {
      this.router.navigate([route]);
    }
  }
  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
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
