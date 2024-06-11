import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoggedIn!: boolean;

  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl(this.email, [Validators.required, Validators.minLength(2)]),
    password: new FormControl(this.password, [Validators.required, Validators.minLength(8)])
  });

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );
    if (this.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
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
