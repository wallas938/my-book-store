import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../services/book.service';
import { Ibook } from '../interfaces/Ibook';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  books: any[]
  booksSubcription: Subscription
  Total: Number
  lastQuery: String

  constructor(private bookService: BookService,
              private cartService: CartService) {

  }
  
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.booksSubcription = this.bookService.booksSubject.subscribe(
      (books: any[]) => {
        this.books = books
      }
    )
    this.bookService.booksSubjectEmitter()
  }

  cartFiller(bookId: String) {

    let boughtBook: Ibook

    this.books.forEach(element => {

      if(element.id === bookId)
        boughtBook = element

    });

      this.cartService.addToCart(boughtBook)
    }

}
