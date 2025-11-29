import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environment';

export interface SignUpPayload { name: string; email: string; password: string; phone: string; userType: string; }
export interface LoginPayload { email: string; password: string; }
export interface User { id: number; name: string; email: string; userType: string; phone: string; }


const SIGNUP_API_PATH = `${environment.bookstoreExpressUrl}${environment.signupApiPath}`;
const LOGIN_API_PATH = `${environment.bookstoreExpressUrl}${environment.loginApiPath}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('auth_token'));
  public readonly isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  private readonly _currentUser$ = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('current_user') || 'null'));
  public readonly currentUser$: Observable<User | null> = this._currentUser$.asObservable();
  
  private readonly _isAdmin$ = new BehaviorSubject<boolean>(!!(this._currentUser$.value && this._currentUser$.value.userType === 'ADMIN'));
  public readonly isAdmin$: Observable<boolean> = this._isAdmin$.asObservable();

  private readonly _isCustomer$ = new BehaviorSubject<boolean>(!!(this._currentUser$.value && this._currentUser$.value.userType === 'CUSTOMER'));
  public readonly isCustomer$: Observable<boolean> = this._isCustomer$.asObservable();

  constructor(private http: HttpClient) { }

  signUp(payload: SignUpPayload): Observable<any> {
    return this.http.post(`${SIGNUP_API_PATH}`, payload);
  }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(LOGIN_API_PATH, payload);
  }

  logout() {
    this.setAuth(null, null);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.setAuth(token, token ? this._currentUser$.value : null);
  }
  
  setAuth(token: string | null, user: User | null) {
    if (token) {
      localStorage.setItem('auth_token', token);
      this._isLoggedIn$.next(true);
    } else {
      localStorage.removeItem('auth_token');
      this._isLoggedIn$.next(false);
    }

    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
      this._currentUser$.next(user);
      this._isLoggedIn$.next(true);
      this._isAdmin$.next(user.userType === 'ADMIN');
      this._isCustomer$.next(user.userType === 'CUSTOMER');

    } else {
      localStorage.removeItem('current_user');
      this._currentUser$.next(null);
      this._isLoggedIn$.next(false);
      this._isAdmin$.next(false);
      this._isCustomer$.next(false);
    }
  }
}