import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.css'
})
export class InvitationComponent implements OnInit{
  activationUrl: string | null = null;
  error: string | null = null;
  successEmail: string | null = null;
  successToken: string | null = null;
  
  
  router = inject(Router);


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.activationUrl = params.get('activation_url');
  
      if (this.activationUrl) {
        this.authService.acceptInvitation(this.activationUrl).subscribe({
          next: (response) => {
            if (response.clientEmail) {
              this.successEmail = response.clientEmail;
              this.router.navigate(['/register', this.successEmail]);
              alert("You have been enrolled to a new loyalty program!");
              
            } else if (response.token) {
              this.successToken = response.token;
              console.log("TOKEN");
              this.authService.authenticateByToken(this.successToken!);
              this.router.navigate(['/']);
              alert("You have been enrolled to a new loyalty program!");
            } else {
              this.error = 'Unexpected response format';
              console.log("ERROR");
            }
          },
          error: (err) => {
            this.error = err.message;
            console.log("ERROR");
          }
        });
      }
    });
  }

}
