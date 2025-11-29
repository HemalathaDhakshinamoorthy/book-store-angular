import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitting = false;
  serverError = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.serverError = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const { email, password } = this.loginForm.value;
    this.auth.login({ email, password }).subscribe({
      next: (res) => {
        const token = res?.token ?? null;
        const user: User | null = res?.user ?? null;
        if (token || user) {
          this.auth.setAuth(token, user);
        }
        this.submitting = false;
        this.router.navigate(['/'], { state: { notificationMessage: 'Login successful', notificationType: 'success' } });
      },
      error: (err) => {
        this.submitting = false;
        this.serverError = err?.error?.message || 'Login failed. Check credentials.';
      }
    });
  }
}