import { NgTemplateOutlet } from '@angular/common';
import { Component, input, Input, TemplateRef } from '@angular/core';

export const ButtonVariant = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  neutral: 'neutral',
};

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

@Component({
  standalone: true,
  selector: 'button[appButton]',
  templateUrl: './button.component.html',
  host: {
    class: 'button',
    '[class.button-primary]': `variant()==="primary"`,
    '[class.button-secondary]': `variant()==="secondary"`,
    '[class.button-tertiary]': `variant()==="tertiary"`,
    '[class.button-neutral]': `variant()==="neutral"`,
    '[class.button-small]': `size()==="small"`,
    '[class.button-medium]': `size()==="medium"`,
    '[class.button-large]': `size()==="large"`,
    '[class.button-disabled]': 'disable()',
    '[class.button-loading]': 'loading()',
  },
  imports: [NgTemplateOutlet],
})
export class ButtonComponent {
  readonly disable = input(false);
  readonly loading = input(false);

  readonly startIcon = input<TemplateRef<any> | null>(null);
  readonly endIcon = input<TemplateRef<any> | null>(null);
  readonly loadingRef = input<TemplateRef<any> | null>(null);

  readonly variant = input<ButtonVariant>(ButtonVariant.primary);
  readonly size = input<ButtonSize>(ButtonSize.medium);
}
