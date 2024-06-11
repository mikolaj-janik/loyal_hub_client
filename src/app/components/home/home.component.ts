import { Component, OnInit, inject } from '@angular/core';
import { AuthService, Statistic } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService);
  statistics: Statistic[] = [];


  user?: any;

  ngOnInit() {
    const token: string = this.authService.getJwtToken() as string;
    console.log('JWT Token:', token);

    this.authService.getStatistics().subscribe(
      (data: Statistic[]) => {
        this.statistics = data;
        console.log('Fetched statistics:', this.statistics);
      },
      (error) => {
        console.error('Error fetching statistics', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
