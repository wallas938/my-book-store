import { Component, OnInit, Input } from "@angular/core";
import { BookService } from "../services/book.service";
import { Ibook } from "../interfaces/Ibook";
import { Subscription } from "rxjs";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  books: Ibook[];
  booksSubcription: Subscription;
  Total: Number;
  lastQuery: String;

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

   /*  if(window.localStorage.getItem("books")) {
      this.books = JSON.parse(window.localStorage.getItem("books"));
    } */

      this.booksSubcription = this.bookService.booksSubject.subscribe(
      (books: Ibook[]) => {
        this.books = books.length > 0 ? books : JSON.parse(window.localStorage.getItem("books"));
      }
    );

    this.bookService.booksSubjectEmitter();

    this.cartService.booksCountEmitter();

  }

  cartFiller(bookId: String) {

    let boughtBook: Ibook;

    this.books.forEach(element => {
      if (element.id === bookId) {
        element.isInCart = true;

        boughtBook = element;
      }

      this.cartService.booksCountEmitter();

      this.bookService.booksSubjectEmitter();
    });

    this.cartService.addToCart(boughtBook);

    //window.localStorage.setItem("books", JSON.stringify(this.books));

    this.cartService.booksCountEmitter();
  }

  retrieveHandler(bookId: String) {
    this.books.forEach(element => {
      if (element.id === bookId) {
        element.isInCart = false;
      }
    });

    this.cartService.deleteBookFromMain(bookId);

    //window.localStorage.setItem("books", JSON.stringify(this.books));

    this.cartService.booksCountEmitter();
  }

  open(bookId: String) {
    console.log("works");
    console.log(bookId);
  }
}
