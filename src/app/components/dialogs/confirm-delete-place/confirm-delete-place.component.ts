import { Component, OnInit, Inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { PlaceService } from '../../../services/place.service';
import { MAT_DIALOG_DATA } from '@angular/material';

interface DialogData {
	idPlace: string
}

@Component({
	selector: 'app-confirm-delete-place',
	templateUrl: './confirm-delete-place.component.html',
	styleUrls: ['./confirm-delete-place.component.css']
})
export class ConfirmDeletePlaceComponent implements OnInit {

	constructor(private toast: ToastService,
		private placeService: PlaceService,
		@Inject(MAT_DIALOG_DATA) private data: DialogData) { }

	ngOnInit() {
	}

	deletePlace() {
		this.placeService.deletePlace(this.data.idPlace).then(() => {
			this.toast.showSuccess("El lugar ha sido borrado");
		});
	}

}
