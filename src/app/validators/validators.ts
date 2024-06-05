import { AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {

    const formGroup = control as FormGroup;
    const password = formGroup.get('password');
    const repeatedPassword = formGroup.get('repeatedPassword');
  
    if (password && repeatedPassword && password.value !== repeatedPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  };