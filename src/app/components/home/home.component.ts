import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService)

  user?: any;

  constructor() {
    
      this.authService.getCurrentAuthUser().subscribe((r) => {
        this.user = r;
        console.log(r);
      });
  }
  logout() {
    this.authService.logout();
  }
}
