import {
  Directive,
  Input,
  OnChanges,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
interface ErrorMessages {
  required?: boolean;
  minlength?: { requiredLength: number; actualLength: number };
  email?: boolean;
}

interface Params {
  fieldName: string;
}

@Directive({
  selector: '[error]',
  standalone: true,
})
export class AppErrorDirective implements OnChanges {
  @Input() error: ErrorMessages | null | undefined = null;
  @Input() params: Params | null = null;
  @Input() show = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  ngOnChanges(): void {
    if (this.show && this.error && this.params) {
      const message = this.getErrorMessage(this.error, this.params);
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', message);
      this.renderer.setStyle(this.el.nativeElement, 'display', 'inline');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

  private getErrorMessage(
    error: ErrorMessages,
    params: { fieldName: string; requiredLength?: number }
  ): string {
    if (error.required) {
      return this.translate.instant('ERROR.REQUIRED', {
        fieldName: params.fieldName,
      });
    }
    if (error.minlength) {
      return this.translate.instant('ERROR.MIN_LENGTH', {
        fieldName: params.fieldName,
        requiredLength: error.minlength.requiredLength,
      });
    }
    if (error.email) {
      return this.translate.instant('ERROR.INVALID_EMAIL', {
        fieldName: params.fieldName,
      });
    }
    return '';
  }
}
