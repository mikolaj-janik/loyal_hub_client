import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../validators/validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  repeatedPassword = '';
  error = '';

  authService = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl(this.email, [Validators.required, Validators.minLength(2)]),
    password: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
    repeatedPassword: new FormControl(this.password, [Validators.required, Validators.minLength(8)])
  }, { validators: passwordMatchValidator });
  register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      console.log(`Login: ${email} / ${password}`);
      this.authService
    .login({
      email: email as string,
      password: password as string
    })
    .subscribe(() => {
      if (this.authService)
      this.router.navigate(['/']);
    });
    } else {
      console.log('Form is not valid');
    }
  }
}
