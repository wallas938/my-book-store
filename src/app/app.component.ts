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

  lastQuery: String

  boughtBooksCount: number

  userQuery = new FormControl('')

  constructor(private bookService: BookService,
              private cartService: CartService
              ) { 
                this.boughtBooksCountSubscription = this.cartService.booksCountSubject.subscribe(
                  booksCount => {
                    this.boughtBooksCount = booksCount
                  }
                )
                this.cartService.booksCountEmitter()
              }

  ngOnInit() {

    /* if(window.localStorage) {

      this.books = JSON.parse(window.localStorage.getItem('books'))
    } */
    
    
  
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
