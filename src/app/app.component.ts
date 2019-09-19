import { Component } from '@angular/core';
import { BookService } from './services/book.service';
import { Ibook } from './interfaces/Ibook';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books: any[]

  booksSubscription: Subscription

  boughtBooksCountSubscription: Subscription

  lastQuery: string

  boughtBooksCount: number

  userQuery = new FormControl('')

  constructor(private bookService: BookService,
              private cartService: CartService
              ) {}

  ngOnInit() {

     if(window.localStorage.getItem("books")  && window.localStorage.getItem("lastQuery") &&   window.localStorage.getItem("booksCount")) {

      this.books = JSON.parse(window.localStorage.getItem('books'));

      this.lastQuery = window.localStorage.getItem('lastQuery');

      this.boughtBooksCount = +(window.localStorage.getItem('lastQuery'));

      this.bookService.queryHandler(this.lastQuery);

      this.userQuery.setValue('');

      this.cartService.booksCountEmitter();
    } else {
      this.boughtBooksCountSubscription = this.cartService.booksCountSubject.subscribe(
        booksCount => {
          this.boughtBooksCount = booksCount
        }
      )
      this.cartService.booksCountEmitter()
    }

  }


  clickHandler() {

    this.bookService.queryHandler(this.userQuery.value)

    this.lastQuery = this.userQuery.value

    this.userQuery.setValue('')

    this.cartService.booksCountEmitter()
  }

  ngOnDestroy(): void {

  }
}
