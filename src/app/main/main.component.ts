import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../services/book.service';
import { Ibook } from '../interfaces/Ibook';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  books: any[]
  booksSubcription: Subscription
  @Input() lastQuery: String

  constructor(private bookService: BookService) {

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

  test() {
    console.log(this.books);
  }

}
