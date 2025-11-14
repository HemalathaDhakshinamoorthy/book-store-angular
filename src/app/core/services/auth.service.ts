import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

export interface SignUpPayload { name: string; email: string; password: string; phone: string; userType: string; }
export interface LoginPayload { email: string; password: string; }

const SIGNUP_API_PATH = `${environment.bookstoreExpressUrl}${environment.signupApiPath}`;
const LOGIN_API_PATH = `${environment.bookstoreExpressUrl}${environment.loginApiPath}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(payload: SignUpPayload): Observable<any> {
    return this.http.post(`${SIGNUP_API_PATH}`, payload);
  }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(LOGIN_API_PATH, payload);
  }
}