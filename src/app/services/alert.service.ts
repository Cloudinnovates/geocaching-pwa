import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../components/dialogs/alert/alert.component';

@Injectable({
	providedIn: 'root'
})
export class AlertService {

	constructor(private dialog: MatDialog) { }

	public show(message: string): void {
		this.dialog.open(AlertComponent, {
			data: { message }
		});
	}

}
