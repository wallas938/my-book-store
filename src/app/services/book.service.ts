import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Ibook } from '../interfaces/Ibook';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Ibook[] = [
    
  ]

  booksSubject = new Subject<any>();

  constructor(private http: HttpClient) { }

  booksSubjectEmitter() {
    
    this.booksSubject.next(this.books.slice())
  } 

  queryHandler(query: String) {

    
    this.getBooksFromGoogleApi(query).subscribe(
      books => {
        this.books = books.items.map(book => {
          let formatedBook: Ibook = {
            id: book.id,
            title: book.volumeInfo.title,
            price: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : "Price not found" ,
            currencyCode: book.saleInfo.listPrice ? book.saleInfo.listPrice.currencyCode : "",
            author: book.volumeInfo.authors,
            categories: book.volumeInfo.categories,
            description: book.volumeInfo.description,
            language: book.volumeInfo.language,
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://www.404.ie/assets/img/logo_blue.png",
            averageRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : "Aucune evaluation est disponible",
          }
          return formatedBook
        })
        this.booksSubjectEmitter()
        return this.books
      }
    )
  }

  getBooksFromGoogleApi(query: String): Observable<any> {
    return  this.http.get<any[]>('https://www.googleapis.com/books/v1/volumes?q=' + query)
  }

  

  toJSON(books: any[]) {

    //this.books = JSON.stringify(books)

  }
  
}