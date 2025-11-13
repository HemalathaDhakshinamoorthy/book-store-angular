import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-book-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './book-carousel.component.html',
  styleUrls: ['./book-carousel.component.css']
})
export class BookCarouselComponent {  

  books: any[] = [];
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' | null = null;

  constructor(
    private bookService: BookService, 
  ) { }

  ngOnInit() { 
    this.loadBooks(); 
  }

  loadBooks() {
    this.bookService.getBooks()
      .then(res => this.books = res.data)
      .catch(err => this.showNotification(`Error: ${err.message}`, 'error'));
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.notificationMessage = null;
      this.notificationType = null;
    }, 3000);
  }

}
