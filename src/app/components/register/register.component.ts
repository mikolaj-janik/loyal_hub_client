import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.email = params.get('email') as string;
    });
  }

  registerForm = new FormGroup({
    password: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
    repeatedPassword: new FormControl(this.repeatedPassword, [Validators.required, Validators.minLength(8)])
  }, { validators: passwordMatchValidator });
  register() {
    if (this.registerForm.valid) {
      const { password, repeatedPassword } = this.registerForm.value;
      console.log(`Login: ${this.email} / ${password}`);
      this.authService
    .register({
      email: this.email as string,
      password: password as string,
      repeatedPassword: repeatedPassword as string
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
