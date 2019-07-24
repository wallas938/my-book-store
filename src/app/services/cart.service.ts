import { Injectable } from '@angular/core';
import { BookService } from './book.service';
import { Ibook } from '../interfaces/Ibook';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  books: Ibook[] = []

  total: number

  totalSubject = new Subject()

  booksCount: number

  booksCountSubject = new Subject<number>()

  booksCart: Ibook[] = []

  booksCartSubject = new Subject()



  constructor(private bookService: BookService) { 
  }

  ngOnInit(): void {
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  addToCart(book: Ibook) {

    this.booksCart = [...this.booksCart, book]

    this.cartSubjectEmitter()
  }

  deleteBookFromMain(bookId: String) {
    
    this.booksCart = [...this.booksCart].filter(
      book => {
        return bookId !== book.id
      }
    )

    this.cartSubjectEmitter()
  }

  deleteBookFromCart(bookId: String) {
    
    this.deleteBookFromMain(bookId)

    this.bookService.updateMainBooks(bookId)

    this.cartSubjectEmitter()
  }

  getTotal(): number {
    this.total = 0;

    for(let i = 0; i < this.booksCart.length; i++) {
      
      this.total += this.booksCart[i].changeablePrice

    }

    return Number(this.total.toFixed(2))
  }

  getBooksCount(): number {

    this.booksCount = this.booksCart.length

    return this.booksCount
  }

  getBooksFromCart(): Ibook[] {
    return this.booksCart
  }

  increaseQuantity(bookId: String): void {
    this.booksCart = [...this.booksCart].map<Ibook>(
      book => {
        if(book.id === bookId) {

          book.numberOfBooks < 9 && book.numberOfBooks++

          
          book.changeablePrice = +(book.initialPrice * book.numberOfBooks ).toFixed(2) 
        }

        return book
      }
    )
    this.cartSubjectEmitter()

    this.totalSubjectEmitter()

    this.booksCountEmitter()
  }

  dicreaseQuantity(bookId: String): void {
    this.booksCart = [...this.booksCart].map<Ibook>(
      book => {
        if(book.id === bookId) {

          book.numberOfBooks > 1 && book.numberOfBooks--

          book.changeablePrice = +(book.initialPrice * book.numberOfBooks ).toFixed(2)

        }

        return book
      }
    )
    this.cartSubjectEmitter()

    this.totalSubjectEmitter()

    this.booksCountEmitter()
  }

  cartSubjectEmitter () {
          
    this.booksCartSubject.next(this.booksCart.slice())
    
  }

  totalSubjectEmitter () {
          
    this.totalSubject.next(this.getTotal())
    
  }

  booksCountEmitter() {
    this.booksCountSubject.next(this.getBooksCount())
  }

}
