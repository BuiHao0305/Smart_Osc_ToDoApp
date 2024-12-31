import { Component, OnInit } from '@angular/core';
import { CustomInputComponent } from '../../custom-component/custom-input/component/custom-input.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppErrorDirective } from 'src/app/core/directive/error.directive';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  standalone: true,
  imports: [
    CustomInputComponent,
    ReactiveFormsModule,
    FormsModule,
    AppErrorDirective,
    CommonModule,
  ],
})
export class TestComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      username: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {}
}
