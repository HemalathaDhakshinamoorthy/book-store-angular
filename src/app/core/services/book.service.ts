import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environment';

const API_URL = `${environment.bookstoreExpressUrl}${environment.apiPath}`;

@Injectable({
  providedIn: 'root'
})
export class BookService {
  getBooks() { return axios.get(`${API_URL}`); }
  getBook(id: number) { return axios.get(`${API_URL}/${id}`); }
  addBook(book: any) { return axios.post(`${API_URL}`, book); }
  updateBook(id: number, book: any) { return axios.put(`${API_URL}/${id}`, book); }
  deleteBook(id: number) { return axios.delete(`${API_URL}/${id}`); }
  purchaseBook(id: number) { return axios.post(`${API_URL}/${id}/purchase`); }
}
