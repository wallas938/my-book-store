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
		comic: new FormControl(''),
		fantastic: new FormControl(''),
		horror: new FormControl(''),
		fiction: new FormControl(''),
		"french literature": new FormControl(''),
		frendship: new FormControl(''),
		literary: new FormControl(''),
		criticism: new FormControl(''),
		biography: new FormControl(''),
		autobiography: new FormControl(''),
		women: new FormControl(''),
		education: new FormControl(''),
		science: new FormControl(''),
		social: new FormControl(''),
		politic: new FormControl(''),
		philosophy: new FormControl(''),
		juvenile: new FormControl(''),
		drama: new FormControl(''),
		religion: new FormControl(''),
		history: new FormControl(''),
		fiveStar: new FormControl(''),
		fourStar: new FormControl(''),
		threeStar: new FormControl(''),
		twoStar: new FormControl(''),
		oneStar: new FormControl(''),

	});

	constructor(private filterService: FilterService) { }

	ngOnInit() {

	}

	onFilter() {
		this.filterService.booksFilter(this.filterForm.value);
	}

	initFilter() {
		this.filterForm.reset()
	}

}
