import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../services/book.service';
import { Ibook } from '../interfaces/Ibook';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  @Input() books: String
  @Input() lastQuery: String
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  test() {
    console.log(this.books);
  }

}
