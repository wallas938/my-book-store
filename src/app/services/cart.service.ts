import { Injectable } from '@angular/core';
import { BookService } from './book.service';
import { Ibook } from '../interfaces/Ibook';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  books: Ibook[] = []

  total: number  = JSON.parse(window.localStorage.getItem("total")) ? JSON.parse(window.localStorage.getItem("total")) : 0;

  totalSubject = new Subject()

  booksCount: number =  JSON.parse(window.localStorage.getItem("count")) ? JSON.parse(window.localStorage.getItem("count")) : 0;

  booksCountSubject = new Subject<number>()

  booksCart: Ibook[] = JSON.parse(window.localStorage.getItem("booksCart")) ? JSON.parse(window.localStorage.getItem("booksCart")) : [];

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

    //window.localStorage.setItem("cartBooks", JSON.stringify(this.booksCart));

    console.log("addToCart")
  }

  deleteBookFromMain(bookId: String) {

    this.booksCart = [...this.booksCart].filter(
      book => {
        return bookId !== book.id
      }
    )

    this.cartSubjectEmitter()

    //window.localStorage.setItem("cartBooks", JSON.stringify(this.booksCart));
  }

  deleteBookFromCart(bookId: String) {

    this.deleteBookFromMain(bookId)

    this.bookService.updateMainBooks(bookId)

    this.cartSubjectEmitter()

    this.booksCountEmitter()

    //window.localStorage.setItem("cartBooks", JSON.stringify(this.booksCart));
  }

  getTotal(): number {
    this.total = 0;

    for (let i = 0; i < this.booksCart.length; i++) {

      this.total += this.booksCart[i].changeablePrice

    }
    //window.localStorage.setItem("total", JSON.stringify(this.total));

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
        if (book.id === bookId) {

          book.numberOfBooks < 10 && book.numberOfBooks++
          //let prixMoinsCinqPourcents = book.initialPrice - (book.changeablePrice * 0.05)

          //console.log(+(book.initialPrice - (book.initialPrice * 0.05)).toFixed(2))

          if (book.numberOfBooks === 10) {

            book.changeablePrice = +(((book.initialPrice - (book.initialPrice * book.bigReduction)) * book.numberOfBooks).toFixed(2))
            //book.changeablePrice = +(((book.initialPrice - (book.initialPrice * 0.05)) -  * book.numberOfBooks) - ((book.initialPrice - (book.initialPrice * 0.05)) * book.numberOfBooks) * 0.10).toFixed(2)

          } else {

            book.changeablePrice = +(((book.priceAfterReduction * book.numberOfBooks)).toFixed(2))
          }

          return book
        }
          return book

      })
    this.cartSubjectEmitter()

    this.totalSubjectEmitter()

/* window.localStorage.setItem("cartBooks", JSON.stringify(this.booksCart));

    window.localStorage.setItem("total", JSON.stringify(this.total));

    window.localStorage.setItem("booksCount", JSON.stringify(this.booksCount)); */
  }

  dicreaseQuantity(bookId: String): void {
    this.booksCart = [...this.booksCart].map<Ibook>(
      book => {
        if (book.id === bookId) {

          book.numberOfBooks > 1 && book.numberOfBooks--

          book.changeablePrice = +(((book.priceAfterReduction * book.numberOfBooks)).toFixed(2))

        }

        return book
      }
    )
    this.cartSubjectEmitter();

    this.totalSubjectEmitter();

/* window.localStorage.setItem("cartBooks", JSON.stringify(this.booksCart));

    window.localStorage.setItem("total", JSON.stringify(this.total));

    window.localStorage.setItem("booksCount", JSON.stringify(this.booksCount)); */

  }

  cartSubjectEmitter() {

    this.booksCartSubject.next(this.booksCart.slice());
    window.localStorage.setItem("booksCart", JSON.stringify(this.booksCart));

  }

  totalSubjectEmitter() {

    this.totalSubject.next(this.getTotal());
    window.localStorage.setItem("total", JSON.stringify(this.total));
  }

  booksCountEmitter() {
    this.booksCountSubject.next(this.getBooksCount());
    window.localStorage.setItem("count", JSON.stringify(this.booksCount));
  }

}
