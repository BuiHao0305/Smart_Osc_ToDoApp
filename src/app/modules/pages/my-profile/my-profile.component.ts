import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from 'src/app/core/store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/store/type/auth.type';
import { selectUserInfo } from 'src/app/core/store/auth/auth.selectors';
import { UserService } from 'src/app/services/page/user.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { authActions } from 'src/app/core/store/auth/auth.action';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule,TranslateModule],
})
export class MyProfileComponent implements OnInit {
  profileForm: FormGroup;
  userInfo$: Observable<User | null>;
  avatarFile: File | null = null;
  avatarUrl: string | null = null;
  userInfoFromLocalStorage: User | null = null;
  @Output() avatarUpdated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private userService: UserService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      email: [{ disabled: true }, [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
    });

    this.userInfo$ = this.store.select(selectUserInfo);
  }

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfoFromLocalStorage = JSON.parse(userInfo);
      this.setFormData();
    }
    this.userService.getAvatar().subscribe(
      (response) => {
        this.avatarUrl = response;
      },
      (error) => {
        console.error('Không thể tải ảnh đại diện', error);
      }
    );
  }

  setFormData(): void {
    if (this.userInfoFromLocalStorage) {
      this.profileForm.patchValue({
        email: this.userInfoFromLocalStorage.email,
        username: this.userInfoFromLocalStorage.username,
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.avatarFile = file;
      this.avatarUrl = URL.createObjectURL(file);
      this.userService.triggerAvatarUpdate();
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const userData = this.profileForm.value;
      const formData = new FormData();
      formData.append('email', userData.email);
      formData.append('username', userData.username);
      if (this.avatarFile) {
        formData.append('avatar', this.avatarFile);
      }

      this.userService.updateUser(formData).subscribe(
        () => {
          this.snackbar.show('Cập nhật thông tin thành công');
          this.store.dispatch(authActions.updateUserSuccess());
          this.router.navigate(['layout/dashboard']);
          this.userService.triggerAvatarUpdate();
        },
        (error) => {
          console.error('Cập nhật thất bại', error);
        }
      );
    } else {
      console.log('Form không hợp lệ');
    }
  }
}
