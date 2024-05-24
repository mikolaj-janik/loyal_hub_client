import { Component, inject, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css'
})
export class LogoutButtonComponent {
  authService = inject(AuthService);
  isLoggedIn! : boolean;

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }
  logout() {
    if (this.isLoggedIn) {
      this.authService.logout();
      alert(`You have been logged out`);    }
  }
}
