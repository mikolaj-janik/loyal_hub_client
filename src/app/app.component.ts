import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { LogoutButtonComponent } from "./components/logout-button/logout-button.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LogoutButtonComponent]
})
export class AppComponent {
  
}
