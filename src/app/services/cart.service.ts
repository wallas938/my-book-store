import { Injectable } from '@angular/core';
import { BookService } from './book.service';
import { Ibook } from '../interfaces/Ibook';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  books: Ibook[]

  booksCart: Ibook[] = []

  booksSubject = new Subject()

  booksCartSubject = new Subject()

  booksSubscription: Subscription

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  addToCart(book: Ibook) {
    this.booksCart = [...this.booksCart, book]

    this.cartSubjectEmitter()
  }

  deleteFromCart(bookId: String) {
    
    this.booksCart = [...this.booksCart].filter(
      book => {
        return bookId !== book.id
      }
    )
  }
    
  cartSubjectEmitter () {
          
    this.booksSubject.next(this.booksCart.slice())
    
  }

  getTotal(): number {
    let total: number = 0;

    for(let i = 0; i < this.booksCart.length; i++) {
      
      total += this.booksCart[i].price

    }

    return total
  }

  getBooksFromCart(): Ibook[] {
    return this.booksCart
  }

}
