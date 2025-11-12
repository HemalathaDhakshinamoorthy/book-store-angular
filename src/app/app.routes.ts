import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/signup/signup.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookPurchaseComponent } from './components/book-purchase/book-purchase.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'book-carousel', pathMatch: 'full' }, // Default child route
      { path: 'book-carousel', loadComponent: () => import('./components/book-carousel/book-carousel.component').then(m => m.BookCarouselComponent) },
      { path: 'booklist', loadComponent: () => import('./components/book-list/book-list.component').then(m => m.BookListComponent) },
      { path: 'signup', component: SignUpComponent }
    ]
   },
  { path: '**', redirectTo: '' }
];
