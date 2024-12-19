// custombutton.component.ts

export const ButtonStyle = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  neutral: 'neutral',
} as const;

export type ButtonStyle = (typeof ButtonStyle)[keyof typeof ButtonStyle];

export const ButtonSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
