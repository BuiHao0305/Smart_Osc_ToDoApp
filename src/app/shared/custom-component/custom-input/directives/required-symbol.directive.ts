import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[requiredSymbol]',
  standalone: true,
})
export class RequiredSymbolDirective implements OnChanges {
  @Input() hasRequiredValidator = false;

  @Input() isRequired?: boolean;

  @Input() isDisabled?: boolean;
  constructor(private elementRef: ElementRef) {}
  ngOnChanges(): void {
    let displayRequiredSymbol = false;

    displayRequiredSymbol = this.hasRequiredValidator;

    if (this.isRequired !== undefined) {
      displayRequiredSymbol = this.isRequired;
    }

    this.elementRef.nativeElement.classList.toggle(
      'required',
      displayRequiredSymbol && !this.isDisabled
    );
  }
}
