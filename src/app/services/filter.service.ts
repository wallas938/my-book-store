import { Injectable } from '@angular/core';
import { BookService } from '../services/book.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
	private genres: any[] = [];
	private stars: any[] = [];
  constructor(private bookService: BookService) { }

    booksFilter(filters: any){
    	this.genres = [];
    	this.stars = [];

    	for(let filter in filters){
    		if(filters[filter]){
    			switch(filter){
    			case "oneStar": 
    				this.stars = [...this.stars, filter];
    				console.log(filter);
    				break;
    			case "twoStar":
    				this.stars = [...this.stars, filter];
    				console.log(filter);
    				break;
    			case "threeStar":
    				this.stars = [...this.stars, filter];
    				console.log(filter);
    				break;
    			case "fourStar":
    				this.stars = [...this.stars, filter];
    				console.log(filter);
    				break
    			case "fiveStar":
    				this.stars = [...this.stars, filter];
    				console.log(filter);
    				break; 
    			default:
    				this.genres = [...this.genres, filter];
    				console.log(filter);
    				break;
    		  	}
    		}
    	}
    	this.bookService.applyFilter(this.genres, this.stars);
  }

}
