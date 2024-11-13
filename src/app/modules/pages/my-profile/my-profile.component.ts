import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
})
export class MyProfileComponent {
  profileForm: FormGroup;

  avatarUrl= '';

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Form Submitted', this.profileForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
