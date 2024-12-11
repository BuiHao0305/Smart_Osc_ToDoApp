import {
  Directive,
  Input,
  OnChanges,
  ElementRef,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[error]',
  standalone: true,
})
export class ErrorDirective implements OnChanges {
  @Input() error: any;
  @Input() params: any;
  @Input() show: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show && this.error) {
      const message = this.getErrorMessage(this.error, this.params);
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', message);
      this.renderer.setStyle(this.el.nativeElement, 'display', 'inline');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

  private getErrorMessage(error: any, params: any): string {
    if (error.required) {
      return `${params.fieldName} is required.`;
    }
    if (error.minlength) {
      return `${params.fieldName} must be at least ${error.minlength.requiredLength} characters long.`;
    }
    if (error.email) {
      return `Invalid email format for ${params.fieldName}.`;
    }
    return '';
  }
}
