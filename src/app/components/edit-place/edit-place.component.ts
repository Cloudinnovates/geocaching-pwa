import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { MapService } from '../../services/map.service';
import { Place } from '../../models/Place.model';

@Component({
	selector: 'app-edit-place',
	templateUrl: './edit-place.component.html',
	styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {
	
	public formRegister: FormGroup;
	private place: Place;

	constructor(private location: Location,
		private route: ActivatedRoute,
		private spinner: Ng4LoadingSpinnerService,
		private fb: FormBuilder,
		private placeService: PlaceService,
		private toast: ToastService,
		private mapService: MapService) {
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
		this.formRegister = this.fb.group({
			nombre: ["", Validators.required],
			direccion: ["", Validators.required],
			categoria: ["", Validators.required],
			descripcion: ["", [Validators.required, Validators.maxLength(255)]],
			rating: [0]
		});
	}

	goBack() {
		this.location.back();
	}

	doSubmit() {
		this.spinner.show();

		this.place.nombre = this.formRegister.get("nombre").value;
		this.place.direccion = this.formRegister.get("direccion").value;
		this.place.categoria = this.formRegister.get("categoria").value;
		this.place.descripcion = this.formRegister.get("descripcion").value;

		this.mapService.getLatLng(this.place.direccion).then(response => {
			if(response === null){
				this.toast.showError("Dirección no encontrada ...");
				return false;
			}

			this.place.latitud = response.lat;
			this.place.longitud = response.lng;
			
			this.placeService.editPlace(this.place).then(() => {
				this.spinner.hide();
				this.toast.showSuccess("El lugar ha sido editado ...");
			});

		});

	}

}
