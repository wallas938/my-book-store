import { Component } from '@angular/core';
import { BookService } from './services/book.service';
import { Ibook } from './interfaces/Ibook';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books: any[]

  booksSubscription: Subscription

  lastQuery: String

  userQuery = new FormControl('')

  constructor(private bookService: BookService) { }

  ngOnInit() {

    if(window.localStorage)
    this.books = JSON.parse(window.localStorage.getItem('books'))
  }


  clickHandler() {

    this.bookService.queryHandler(this.userQuery.value)
    this.userQuery.setValue('')

    /* this.lastQuery = this.userQuery.value
    this.booksSubscription = this.bookService.getBook(this.userQuery.value).subscribe(
      books => {
        this.books = books.items.map(book => {
          let formatedBook: any = {
            id: book.id,
            title: book.volumeInfo.title,
            price: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 5.99 ,
            currencyCode: book.saleInfo.listPrice ? book.saleInfo.listPrice.currencyCode : "EUR",
            author: book.volumeInfo.authors,
            categories: book.volumeInfo.categories,
            description: book.volumeInfo.description,
            language: book.volumeInfo.language,
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://www.404.ie/assets/img/logo_blue.png",
            averageRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : "Aucune evaluation est disponible",
            pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "100",
            isEbook: book.saleInfo.isEbook ? book.saleInfo.isEbook : false,
          }
          return formatedBook
        })
        console.log(books)
        window.localStorage.setItem('books', this.bookService.toJSONStringfied(this.books))
      }
      )
    

    this.userQuery.setValue('') */
  }

  ngOnDestroy(): void {
    
  }
}
