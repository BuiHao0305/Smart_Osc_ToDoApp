import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from 'src/app/core/store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/store/type/auth.type';
import { selectUserInfo } from 'src/app/core/store/auth/auth.selectors';
import { UserService } from 'src/app/services/page/user.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class MyProfileComponent implements OnInit {
  profileForm: FormGroup;
  userInfo$: Observable<User | null>;
  avatarUrl = '';
  avatarFile: File | null = null;
  userInfoFromLocalStorage: User | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {
    this.profileForm = this.fb.group({
      email: [{ disabled: true }, [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.userInfo$ = this.store.select(selectUserInfo);
  }

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfoFromLocalStorage = JSON.parse(userInfo);
      this.setFormData();
    }
  }
  setFormData(): void {
    if (this.userInfoFromLocalStorage) {
      this.profileForm.patchValue({
        email: this.userInfoFromLocalStorage.email,
        username: this.userInfoFromLocalStorage.username,
        password: '',
      });

      // if (this.userInfoFromLocalStorage.avatar) {
      //   this.avatarUrl = this.userInfoFromLocalStorage.avatar;
      // }
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.avatarFile = file;
      this.avatarUrl = URL.createObjectURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const userData = this.profileForm.value;
      const formData = new FormData();
      formData.append('email', userData.email);
      formData.append('username', userData.username);
      formData.append('password', userData.password);
      if (this.avatarFile) {
        formData.append('avatar', this.avatarFile);
      }

      this.userService.updateUser(formData).subscribe(
        (response) => {
          this.snackbar.show('Cập nhật thông tin thành công'+response);
          // this.store.dispatch(authActions.loginSuccess({ user: signInResponse }));
        },
        (error) => {
          console.error('Cập nhật thất bại', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
