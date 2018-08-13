import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { PlaceService } from '../../services/place.service';
import { ToastService } from '../../services/toast.service';

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
        private dialog: MatDialog,
        private placeService: PlaceService,
        private toast: ToastService) { }

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

    private deletePlace() {
        this.placeService.deletePlace(this.data.idPlace).then(() => {
            this.toast.showSuccess("El lugar ha sido borrado");
        });
    }

    showDelete(event: MouseEvent) {
        event.preventDefault();
        this.bottomSheetRef.dismiss();
        this.dialog.open(DialogComponent, {
            data: {
                message: "¿ Desea borrar el lugar seleccionado ?",
                acceptFunc: () => this.deletePlace()
            }
        });
    }

}
