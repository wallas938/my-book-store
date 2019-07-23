import { Component } from '@angular/core';
import { BookService } from './services/book.service';
import { Ibook } from './interfaces/Ibook';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books: any[]

  booksSubscription: Subscription

  lastQuery: String

  userQuery = new FormControl('')

  constructor(private bookService: BookService) { }

  ngOnInit() {

    if(window.localStorage)
    this.books = JSON.parse(window.localStorage.getItem('books'))
  }


  clickHandler() {

    this.bookService.queryHandler(this.userQuery.value)

    this.lastQuery = this.userQuery.value

    this.userQuery.setValue('')
  }
  
  ngOnDestroy(): void {
    
  }
}
