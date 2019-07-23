import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';
import { Ibook } from '../interfaces/Ibook';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  books: any[]

  booksCart: Ibook[]

  total: number

  totalSubscription: Subscription
  
  booksSubscription: Subscription

  booksCartSubscription: Subscription

  constructor(private bookService: BookService,
              private cartService: CartService) { 
                this.booksCart = this.cartService.getBooksFromCart()
                this.total = this.cartService.getTotal()
              }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.booksCartSubscription = this.cartService.booksCartSubject.subscribe(
      
      (booksCart: any[]) => {

        this.booksCart = booksCart

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

  retrieveHandlerFromCart(bookId: String) {

    this.cartService.deleteBookFromCart(bookId)
    
    this.cartService.cartSubjectEmitter()

    this.cartService.totalSubjectEmitter()

    this.cartService.booksCountEmitter()
  }

}
