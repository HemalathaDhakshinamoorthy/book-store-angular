import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-purchase',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './book-purchase.component.html',
  styleUrl: './book-purchase.component.css'
})
export class BookPurchaseComponent implements OnInit {
  book: any = null;
  error = '';

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService) {}

  ngOnInit() {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(bookId)
      .then(res => this.book = res.data)
      .catch(err => this.error = err.message);
  }

  purchase() {
    this.bookService.purchaseBook(this.book.id)
      .then(res => {
        alert(res.data.message);
        this.router.navigate(['/books']);
      })
      .catch(err => this.error = err.message);
  }
}
