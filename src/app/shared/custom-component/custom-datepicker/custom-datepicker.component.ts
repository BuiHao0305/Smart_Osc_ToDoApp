import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatepickerComponent),
      multi: true,
    },
  ],
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class CustomDatepickerComponent implements ControlValueAccessor, OnInit {
  selectedDate: Date | null = null;

  private onChange: (value: Date | null) => void = null as unknown as (
    value: Date | null
  ) => void;
  private onTouched: () => void = null as unknown as () => void;

  dateControl: FormControl = new FormControl();

  ngOnInit(): void {
    this.dateControl.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  writeValue(value: string | Date | null): void {
    if (value) {
      this.selectedDate = new Date(value);
      this.dateControl.setValue(this.selectedDate);
    } else {
      this.selectedDate = null;
      this.dateControl.setValue(null);
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.dateControl.disable({ emitEvent: false });
    } else {
      this.dateControl.enable({ emitEvent: false });
    }
  }

  onDateChange(date: Date | null): void {
    this.selectedDate = date;
    this.onChange(date);
  }

  onInputTouched(): void {
    this.onTouched();
  }
}
