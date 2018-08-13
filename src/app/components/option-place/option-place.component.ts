import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog } from '@angular/material';
import { ConfirmDeletePlaceComponent } from '../dialogs/confirm-delete-place/confirm-delete-place.component';

interface InputData {
	idPlace: string
}

@Component({
	selector: 'app-option-place',
	templateUrl: './option-place.component.html',
	styleUrls: ['./option-place.component.css']
})
export class OptionPlaceComponent implements OnInit {

	constructor(private router: Router,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: InputData,
		private bottomSheetRef: MatBottomSheetRef<OptionPlaceComponent>,
		private dialog: MatDialog) { }

	ngOnInit() {
	}

	goToMapPlace(event: MouseEvent) {
		event.preventDefault();
		this.bottomSheetRef.dismiss();
		this.router.navigateByUrl(`/place-map/${this.data.idPlace}`);
	}

	goToEdit(event: MouseEvent) {
		event.preventDefault();
		this.bottomSheetRef.dismiss();
		this.router.navigateByUrl(`/edit-place/${this.data.idPlace}`);
	}

	showDelete(event: MouseEvent) {
		event.preventDefault();
		this.bottomSheetRef.dismiss();
		this.dialog.open(ConfirmDeletePlaceComponent, {
			data: {idPlace: this.data.idPlace}
		});
	}

}
