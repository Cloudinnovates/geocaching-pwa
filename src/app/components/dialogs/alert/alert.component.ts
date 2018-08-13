import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

interface Data {
	message: string
}

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

	public message: string = "";

	constructor(@Inject(MAT_DIALOG_DATA) private data: Data) { 
		this.message = data.message;
	}

	ngOnInit() {
	}

}
