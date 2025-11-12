import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  error = '';
  bookId!: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private bookService: BookService) {
    this.bookForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(this.bookId)
      .then(res => this.bookForm.setValue(res.data))
      .catch(err => this.error = err.message);
  }

  onSubmit() {
    if (this.bookForm.invalid) return;
    this.bookService.updateBook(this.bookId, this.bookForm.value)
      .then(() => this.router.navigate(['/booklist']))
      .catch(err => this.error = err.message);
  }
}
