import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  submitting = false;
  serverError = '';
  registeredMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    console.log('SignUpComponent initialized');
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      userType: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.serverError = '';
    this.registeredMessage = null;
    if (this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const { name, email, password, phone, userType } = this.signUpForm.value;
    this.authService.signUp({ name, email, password, phone, userType }).subscribe({
      next: (res) => {
        this.submitting = false;
        this.registeredMessage = 'Account created successfully';
        this.registeredMessage = 'Registration successful. You can now log in.';
        this.signUpForm.reset();
      },
      error: (err: any) => {
        this.serverError = err?.error?.message || 'Sign up failed. Try again.';
        this.submitting = false;
      }
    });
  }

}