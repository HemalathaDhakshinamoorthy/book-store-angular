import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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

  books = [
    {
      title: 'The Women',
      author: 'Kristin Hannah',
      type: 'Paperback',
      price: 1000,
      oldPrice: 1100,
      image: 'assets/book-covers/the-women.jpg'
    },
    {
      title: 'Food noise',
      author: 'J.K. Rowling',
      type: 'Paperback',
      price: 1000,
      oldPrice: 1250,
      image: 'assets/book-covers/food-noise.jpg'
    },
    {
      title: 'Rabbits Nap',
      author: 'Onjali Q. Raúf',
      type: 'Paperback',
      price: 200,
      oldPrice: 300,
      image: 'assets/book-covers/rabbits-nap.jpg'
    },
    {
      title: 'The Women',
      author: 'Kristin Hannah',
      type: 'Paperback',
      price: 1000,
      oldPrice: 1100,
      image: 'assets/book-covers/the-women.jpg'
    },
    {
      title: 'Cozy Corner',
      author: 'Ben Miller',
      type: 'Paperback',
      price: 600,
      oldPrice: 650,
      image: 'assets/book-covers/cozy-corner.jpg'
    },
    {
      title: 'Rabbits Nap',
      author: 'Onjali Q. Raúf',
      type: 'Paperback',
      price: 200,
      oldPrice: 300,
      image: 'assets/book-covers/rabbits-nap.jpg'
    },
  ];  
}
