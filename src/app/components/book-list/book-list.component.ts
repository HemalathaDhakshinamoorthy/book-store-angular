import { BackgroundFetch } from './../../../../node_modules/@npmcli/git/node_modules/lru-cache/dist/esm/index.d';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookDeleteComponent } from '../book-delete/book-delete.component';
import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  books: any[] = [];
  error = '';
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' | null = null;

  constructor(
    private bookService: BookService, 
    private dialog: MatDialog,
  ) { }

  ngOnInit() { 
    this.loadBooks(); 
  }

  loadBooks() {
    this.bookService.getBooks()
      .then(res => this.books = res.data)
      .catch(err => this.showNotification(`Error: ${err.message}`, 'error'));
  }

  deleteBook(bookId: number): void {
    const dialogRef = this.dialog.open(BookDeleteComponent, {
      data: { id: bookId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.deleteBook(bookId)
          .then(() => {
            this.showNotification('Book deleted successfully!', 'success');
            this.loadBooks();
          })
          .catch(err => {
            this.showNotification(`Error: ${err.message}`, 'error');
          });
      }
    });
  }

  purchaseBook(id: number) {
    this.bookService.purchaseBook(id)
      .then(res => alert(res.data.message))
      .catch(err => this.error = err.message);
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
