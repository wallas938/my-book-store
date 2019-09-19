import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Ibook } from '../interfaces/Ibook';
import { Observable, Subject } from 'rxjs';
import { FilterService } from '../services/filter.service';

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

  queryHandler(query: string) {

    this.getBooksFromGoogleApi(query).subscribe(
      books => {
        this.books = books.items.map(book => {
          let formatedBook: Ibook = {
            id: book.id,
            title: book.volumeInfo.title,
            initialPrice: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 10.00,
            changeablePrice: book.saleInfo.listPrice ? +(book.saleInfo.listPrice.amount - (book.saleInfo.listPrice.amount * 0.05)).toFixed(2) : +(10.00 - (10.00 * 0.05)).toFixed(2),
            priceAfterReduction: book.saleInfo.listPrice ? +(book.saleInfo.listPrice.amount - (book.saleInfo.listPrice.amount * 0.05)).toFixed(2) : +(10.00 - (10.00 * 0.05)).toFixed(2),
            smallReduction: 0.05,
            bigReduction: 0.10,
            currencyCode: book.saleInfo.listPrice ? book.saleInfo.listPrice.currencyCode : "EUR",
            author: book.volumeInfo.authors,
            identifier: book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : "Pas d'ISBN connue",
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
        window.localStorage.setItem("books",  JSON.stringify(this.books));
        window.localStorage.setItem("lastQuery",  query);
        this.booksSubjectEmitter()
        return this.books
      }
    )
  }

  getBooksFromGoogleApi(query: String): Observable<any> {
    return this.http.get<any[]>('https://www.googleapis.com/books/v1/volumes?q=' + query)
  }

  updateMainBooks(bookId: String) {
    this.books.forEach(
      book => {

        if (book.id === bookId)
          book.isInCart = false
      }
    )
    this.booksSubjectEmitter()
  }

  applyFilter(categories: any[], rates: any[]) {

    this.books.forEach(
      book => {
        let haveIt = false
        if (categories.length) {
          for (let i = 0; i < categories.length; i++) {
            for(let j = 0; j < book.categories.length; j++) {

              if (book.categories[j].toLowerCase().trim().includes(categories[i].toLowerCase().trim())) {

                haveIt = true

              }
            }
          }

          if (haveIt) {
            book.hidden = false
            haveIt = false
          } else {

            book.hidden = true
          }

        } else {

          book.hidden = false

        }

      })
    this.booksSubjectEmitter()
  }
}
