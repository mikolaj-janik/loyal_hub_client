import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  private routerService = inject(Router);

  private http = inject(HttpClient);

  constructor() { }

  login(user: { email: string, password: string }): Observable<any>{
    return this.http
    .post('https://api.escuelajs.co/api/v1/auth/login', user)
    .pipe(
      tap((tokens: any)=>this.doLoginUser(user.email, tokens.access_token))
    )
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.isAuthenticatedSubject.next(true);
    this.storeJwtToken(token);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.routerService.navigate(['/login']);
  }

  getCurrentAuthUser() {
  
    return this.http.get('https://api.escuelajs.co/api/v1/auth/profile');
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

}
