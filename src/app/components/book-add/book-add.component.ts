import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})
export class BookAddComponent {
  bookForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;
    this.bookService.addBook(this.bookForm.value)
      .then(() => this.router.navigate(['/books']))
      .catch(err => this.error = err.message);
  }
}
