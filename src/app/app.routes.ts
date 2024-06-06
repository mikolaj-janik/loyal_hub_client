import { Routes } from '@angular/router';
import { authGuard, authGuardEmail } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InvitationComponent } from './components/invitation/invitation.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [authGuard]},
    {path: 'invitations/:activation_url', component: InvitationComponent},
    {path: 'login', component: LoginComponent },
    {path: 'register/:email', component: RegisterComponent },
];
