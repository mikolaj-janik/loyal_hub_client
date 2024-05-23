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

  authService = inject(AuthService);
  router = inject(Router);

  
  
  login(event: Event) {
    event.preventDefault();
    console.log(`Login: ${this.email} / ${this.password}`);
    this.authService
    .login({
      email: this.email,
      password: this.password
    })
    .subscribe(() => {
      this.router.navigate(['/']);
    })
  }
}
