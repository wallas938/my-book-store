import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';
import { Ibook } from '../interfaces/Ibook';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  numberOfBooks = new FormControl()

  books: any[]

  booksCart: Ibook[]

  total: number

  totalSubscription: Subscription

  booksSubscription: Subscription

  booksCartSubscription: Subscription

  constructor(private bookService: BookService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class

    //console.log(window.localStorage.getItem("cartBooks"))

    if (window.localStorage.getItem("cartBooks") && window.localStorage.getItem("total")) {
      this.booksCart = JSON.parse(window.localStorage.getItem("cartBooks"));
      this.total = JSON.parse(window.localStorage.getItem("total"));
    } else {
      this.booksCartSubscription = this.cartService.booksCartSubject.subscribe(

        (booksCart: any[]) => {

          this.booksCart = booksCart;

        }

      )

      this.totalSubscription = this.cartService.totalSubject.subscribe(

        (total: number) => {

          this.total = total

        }

      )

      this.cartService.booksCountEmitter()

      this.cartService.cartSubjectEmitter()

      this.cartService.totalSubjectEmitter()

    }

  }

  retrieveHandlerFromCart(bookId: String) {

    this.cartService.deleteBookFromCart(bookId)

    this.cartService.cartSubjectEmitter()

    this.cartService.totalSubjectEmitter()

    this.cartService.booksCountEmitter()
  }

  increaseQuantityHandler(bookId: String) {
    this.cartService.increaseQuantity(bookId)
  }

  dicreaseQuantityHandler(bookId: String) {
    this.cartService.dicreaseQuantity(bookId)
  }

}
