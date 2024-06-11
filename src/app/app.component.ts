import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { LogoutButtonComponent } from "./components/logout-button/logout-button.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LogoutButtonComponent, CommonModule]
})
export class AppComponent {
    authService = inject(AuthService);
    isLoggedIn! : boolean;

    ngOnInit() {
        this.authService.isLoggedIn$.subscribe(
          (loggedIn: boolean) => {
            this.isLoggedIn = loggedIn;
          }
        );
    }
}
