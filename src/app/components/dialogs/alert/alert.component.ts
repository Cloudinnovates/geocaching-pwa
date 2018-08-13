import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AlertData } from '../../../models/Dialogs';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

	public message: string = "";

	constructor(@Inject(MAT_DIALOG_DATA) private data: AlertData) {
		this.message = data.message;
	}

	ngOnInit() {
	}

}
