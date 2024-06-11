import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private loggedUser?: string;
  private hasErrors = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.isAuthenticatedSubject.asObservable();
  private routerService = inject(Router);

  private http = inject(HttpClient);

  constructor() { }

  login(user: { email: string, password: string }): Observable<any>{
    return this.http
    .post('http://localhost:8081/api/login_check', user)
    .pipe(
      tap((tokens: any)=>this.doLoginUser(user.email, tokens.access_token)),
      catchError((error) => {
        if (error.status === 401) {
          this.hasErrors = true;
          return    throwError('Invalid email or password');
        } else {
          
          return throwError('An error occurred during login');
        }
      })
      
    )
  }

  register(user: { email: string, password: string, repeatedPassword: string}): Observable<any>{

    const user1 = {
      password: user.password,
      repeatedPassword: user.repeatedPassword
    };
    return this.http
    .post(`http://localhost:8081/api/clients/${user.email}/completeRegistration`, user1)
    .pipe(
      tap((tokens: any)=>this.doLoginUser(user.email, tokens.access_token)),
      catchError((error) => {
        if (error.status === 401) {
          this.hasErrors = true;
          return throwError('Invalid email or password');
        } else {
          
          return throwError('An error occurred during login');
        }
      })
    )
  }
  acceptInvitation(activationUrl: string): Observable<any> {
    const url = `http://localhost:8081/api/invitations/${activationUrl}/accept`;
    return this.http.post(url, {}); 
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.isAuthenticatedSubject.next(true);
    this.hasErrors = false;
    this.storeJwtToken(token);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  authenticateByToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    this.isAuthenticatedSubject.next(true);
    this.hasErrors = false;
  }

  isError() : boolean {
    return this.hasErrors;
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.routerService.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

}
