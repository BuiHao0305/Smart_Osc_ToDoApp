import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'app-custom-timepicker',
  templateUrl: './custom-timepicker.component.html',
  styleUrls: ['./custom-timepicker.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTimepickerComponent),
      multi: true,
    },
  ],
  imports: [
    FormsModule,
    TranslateModule,
    NzTimePickerModule,
    ReactiveFormsModule,
  ],
})
export class CustomTimepickerComponent implements ControlValueAccessor, OnInit {
  selectedTime: Date | null = null;
  timeControl: FormControl = new FormControl();
  // onChange: (value: any) => void = () => {};
  // onTouched: () => void = () => {};

  private onChange: (value: Date | null) => void = null as unknown as (
    value: Date | null
  ) => void;

  private onTouched: () => void = null as unknown as () => void;

  ngOnInit(): void {
    this.timeControl.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  writeValue(value: string | Date | null): void {
    if (value) {
      if (typeof value === 'string') {
        const [hours, minutes, seconds] = value.split(':');
        this.selectedTime = new Date();
        this.selectedTime.setHours(
          Number(hours),
          Number(minutes),
          Number(seconds),
          0
        );
      } else {
        this.selectedTime =
          value instanceof Date && !isNaN(value.getTime()) ? value : null;
      }
      this.timeControl.setValue(this.selectedTime);
    } else {
      this.selectedTime = null;
      this.timeControl.setValue(null);
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.timeControl.disable({ emitEvent: false });
    } else {
      this.timeControl.enable({ emitEvent: false });
    }
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onTimeChange(time: Date | null): void {
    this.selectedTime = time;
    this.onChange(this.selectedTime);
  }
}
