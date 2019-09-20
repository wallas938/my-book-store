import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';
import { Ibook } from '../interfaces/Ibook';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.css']
})
export class BookDescriptionComponent implements OnInit {

  booksDesc: Ibook[]
  booksDescSubcription: Subscription

  constructor(private bookService: BookService,
    private cartService: CartService) {
  }

  ngOnInit() {

    this.booksDescSubcription = this.bookService.booksSubject.subscribe(
      (booksDesc: Ibook[]) => {
        this.booksDesc = booksDesc
      }
    )
    this.bookService.booksSubjectEmitter()
    this.cartService.booksCountEmitter()
  }

  cartFiller(bookId: String) {

    let boughtBook: Ibook

    this.booksDesc.forEach(element => {

      if (element.id === bookId) {

        element.isInCart = true

        boughtBook = element
      }
    });

    this.cartService.addToCart(boughtBook)

    this.cartService.booksCountEmitter()

    this.bookService.booksSubjectEmitter()

  }

  retrieveHandler(bookId: String) {

    this.booksDesc.forEach(element => {

      if (element.id === bookId) {

        element.isInCart = false

      }

    });

    this.cartService.deleteBookFromMain(bookId)

    this.cartService.booksCountEmitter()
  }

}
