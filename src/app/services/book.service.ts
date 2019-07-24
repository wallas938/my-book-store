import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Ibook } from '../interfaces/Ibook';
import { Observable, Subject } from 'rxjs';
import { FilterService } from '../services/filter.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Ibook[] = [
    
  ]

  lastQuery: String

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
            initialPrice: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 5.99 ,
            changeablePrice: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 5.99,
            currencyCode: book.saleInfo.listPrice ? book.saleInfo.listPrice.currencyCode : "EUR",
            author: book.volumeInfo.authors,
            identifier: book.volumeInfo.industryIdentifiers[0].identifier ? book.volumeInfo.industryIdentifiers[0].identifier : "Pas d'ISBN connue",
            categories: book.volumeInfo.categories ? book.volumeInfo.categories : "Aucune catégorie trouvée",
            description: book.volumeInfo.description ? book.volumeInfo.description : "Aucune description disponible",
            language: book.volumeInfo.language ? book.volumeInfo.language : "Pas de langue définis",
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://www.404.ie/assets/img/logo_blue.png",
            averageRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : "Aucune evaluation est disponible",
            pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 100,
            isEbook: book.saleInfo.isEbook ? book.saleInfo.isEbook : true,
            isInCart: false,
            numberOfBooks: 1,
            hidden: false,
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

  updateMainBooks(bookId: String) {
    this.books.forEach(
      book => {

        if(book.id === bookId )
          book.isInCart = false
      }
    )
    this.booksSubjectEmitter()
  }

  applyFilter(genres: any[], stars: any[] ){
    console.log(genres);
    console.log(stars);
  }

  
}