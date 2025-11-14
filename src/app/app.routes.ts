import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'book-carousel', pathMatch: 'full' }, // Default child route
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'book-carousel', loadComponent: () => import('./components/book-carousel/book-carousel.component').then(m => m.BookCarouselComponent) },
      { path: 'booklist', loadComponent: () => import('./components/book-list/book-list.component').then(m => m.BookListComponent) },
      { path: 'booklist/add', loadComponent: () => import('./components/book-add/book-add.component').then(m => m.BookAddComponent) },
      { path: 'booklist/edit/:id', loadComponent: () => import('./components/book-edit/book-edit.component').then(m => m.BookEditComponent) },
    ]

   },
  { path: '**', redirectTo: '' }
];
