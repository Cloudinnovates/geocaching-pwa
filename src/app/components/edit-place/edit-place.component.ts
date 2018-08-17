import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { MapService } from '../../services/map.service';
import { Place } from '../../models/Place.model';
import { RatingService } from '../../services/rating.service';
import { User } from '../../models/User.model';
import { LatLng } from '../../models/LatLng.model';

@Component({
	selector: 'app-edit-place',
	templateUrl: './edit-place.component.html',
	styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

	public formRegister: FormGroup;
    private place: Place;
    private user: User;

	constructor(private location: Location,
		private route: ActivatedRoute,
		private spinner: Ng4LoadingSpinnerService,
		private placeService: PlaceService,
		private toast: ToastService,
        private mapService: MapService,
        private ratingService: RatingService) {
			this.initForm();
		}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.placeService.getPlace(params["id"]).subscribe((data: Place) => {
				this.place = data;
				this.formRegister.setValue({
					nombre: this.place.nombre,
					direccion: this.place.direccion,
					categoria: this.place.categoria,
					descripcion: this.place.descripcion,
					rating: this.place.rating
				});
			});
		});
	}

	private initForm() {
        this.formRegister = new FormGroup({
            nombre: new FormControl("", Validators.required),
            direccion: new FormControl("", Validators.required),
            categoria: new FormControl("", Validators.required),
            descripcion: new FormControl("", [Validators.required, Validators.maxLength(255)]),
            rating: new FormControl("")
        });
	}

	goBack() {
		this.location.back();
	}

	async doSubmit() {
		this.spinner.show();

		this.place.nombre = this.formRegister.get("nombre").value;
		this.place.direccion = this.formRegister.get("direccion").value;
		this.place.categoria = this.formRegister.get("categoria").value;
        this.place.descripcion = this.formRegister.get("descripcion").value;
        this.place.rating = this.formRegister.get("rating").value;

        const latLng: LatLng = await this.mapService.getLatLng(this.place.direccion);

        if (latLng === null) {
            this.toast.showError('Dirección no encontrada ...');
            return false;
        }

        this.ratingService.saveRatingPlace(this.place.id, this.place.idUser, this.place.rating);

        this.place.latitud = latLng.lat;
        this.place.longitud = latLng.lng;

        await this.placeService.editPlace(this.place);

        this.spinner.hide();
        this.toast.showSuccess("El lugar ha sido editado ...");

	}

}
