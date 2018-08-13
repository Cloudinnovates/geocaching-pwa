import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-edit-place',
	templateUrl: './edit-place.component.html',
	styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

	constructor(private location: Location) { }

	ngOnInit() {
	}

	goBack() {
		this.location.back();
	}

}
