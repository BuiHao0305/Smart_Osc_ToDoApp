export interface ErrorDictionary {
    [key: string]: (param?: { fieldName?: string; requiredLength?: number }) => string;
  }
  
  export const ValidationMessages: ErrorDictionary = {
    nameRequired: () =>
      $localize`:@@nameRequired:Name is required`,
  
    nameMinLength: (param?: { requiredLength?: number }) =>
      $localize`:@@nameMinLength:Name must be at least ${param?.requiredLength} characters`,
  
    emailRequired: () =>
      $localize`:@@emailRequired:Email is required1`,
  
    emailInvalid: () =>
      $localize`:@@emailInvalid:Email must be a valid email address1`,
  
    passwordRequired: () =>
      $localize`:@@passwordRequired:Password is required1`,
  
    passwordMinLength: (param?: { requiredLength?: number }) =>
      $localize`:@@passwordMinLength:Password must be at least ${param?.requiredLength} characters`,
  };
  
  const nameValidation = ValidationMessages["nameRequired"]();
  const emailValidation = ValidationMessages["emailInvalid"]();
  const passwordValidation = ValidationMessages["passwordMinLength"]({ requiredLength: 2 });
  