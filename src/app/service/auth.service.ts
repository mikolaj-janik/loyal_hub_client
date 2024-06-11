import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private hasErrors = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.isAuthenticatedSubject.asObservable();
  private routerService = inject(Router);
  private http = inject(HttpClient);

  constructor() { }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http
      .post('http://localhost:8081/api/login_check', user)
      .pipe(
        tap((tokens: any) => this.doLoginUser(user.email, tokens.token)),
        catchError((error) => {
          if (error.status === 401) {
            this.hasErrors = true;
            return throwError('Invalid email or password');
          } else {
            return throwError('An error occurred during login');
          }
        })
      );
  }

  register(user: { email: string, password: string, repeatedPassword: string }): Observable<any> {
    const user1 = {
      password: user.password,
      repeatedPassword: user.repeatedPassword
    };
    return this.http
      .post(`http://localhost:8081/api/clients/${user.email}/completeRegistration`, user1)
      .pipe(
        tap((tokens: any) => this.doLoginUser(user.email, tokens.token)),
        catchError((error) => {
          if (error.status === 401) {
            this.hasErrors = true;
            return throwError('Invalid email or password');
          } else {
            return throwError('An error occurred during login');
          }
        })
      );
  }

  getStatistics(): Observable<Statistic[]> {
    const url = 'http://localhost:8081/api/statistics';
    const headers = this.getAuthHeaders();

    return this.http.get<{ statistic: Statistic[] }>(url, { headers }).pipe(
      map((response: { statistic: any; }) => response.statistic),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.hasErrors = true;
          return throwError('Unauthorized access');
        } else {
          return throwError('An error occurred while fetching statistics');
        }
      })
    );
  }

  acceptInvitation(activationUrl: string): Observable<any> {
    const url = `http://localhost:8081/api/invitations/${activationUrl}/accept`;
    return this.http.post(url, {});
  }

  private doLoginUser(email: string, token: string) {
    this.loggedUser = email;
    this.isAuthenticatedSubject.next(true);
    this.hasErrors = false;
    this.storeJwtToken(token);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  authenticateByToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    this.isAuthenticatedSubject.next(true);
    this.hasErrors = false;
  }

  isError(): boolean {
    return this.hasErrors;
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.routerService.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getJwtToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}

export interface Statistic {
  loyalty_program_id: string;
  lp_name: string;
  level_name: string | null;
  value_factor: number;
  next_level?: NextLevel;
  promocodes?: Promocode | false;
}

export interface NextLevel {
  id: string;
  loyalty_program_id: string;
  name: string;
  value_factor: number;
}

export interface Promocode {
  id: string;
  client_id: string;
  loyalty_program_id: string;
  type: string;
  status: string;
  value_factor: number;
}