import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from 'src/app/shared/custom-component/custom-input/component/custom-input.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  standalone: true,
  imports: [
    CustomInputComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
})
export class TestComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(2)],
      ],
      username: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {}
}
