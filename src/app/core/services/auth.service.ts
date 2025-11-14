import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

export interface SignUpPayload { name: string; email: string; password: string; }
const SIGNUP_API_PATH = `${environment.bookstoreExpressUrl}${environment.signupApiPath}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(payload: SignUpPayload): Observable<any> {
    return this.http.post(`${SIGNUP_API_PATH}`, payload);
  }
}