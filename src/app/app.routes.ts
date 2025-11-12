import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookPurchaseComponent } from './components/book-purchase/book-purchase.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/add', component: BookAddComponent },
  { path: 'books/edit/:id', component: BookEditComponent },
  { path: 'books/purchase/:id', component: BookPurchaseComponent }
];
