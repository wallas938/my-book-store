import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BookService } from '../services/book.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
filterForm = new FormGroup({
	romantique: new FormControl(''),
	comique: new FormControl(''),
	fantastique: new FormControl(''),
	horreur: new FormControl(''),
	fiction: new FormControl(''),
	fiveStar: new FormControl(''),
	fourStar: new FormControl(''),
	threeStar: new FormControl(''),
	twoStar: new FormControl(''),
	oneStar: new FormControl(''),

});

  constructor(private filterService: FilterService) { }

  ngOnInit() {

  }

  onFilter(){
  	this.filterService.booksFilter(this.filterForm.value);
  }

}
