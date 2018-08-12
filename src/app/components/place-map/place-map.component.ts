import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Place } from './../../models/Place.model';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PlaceService } from '../../services/place.service';

@Component({
	selector: 'app-place-map',
	templateUrl: './place-map.component.html',
	styleUrls: ['./place-map.component.css']
})
export class PlaceMapComponent implements OnInit {

	public place: Place = new Place();
	public lat: number = 0;
	public lng: number = 0;

	constructor(private route: ActivatedRoute,
		private spinnerService: Ng4LoadingSpinnerService,
		private placeService: PlaceService,
		private location: Location) {
		this.init();
	}

	ngOnInit() {
	}


	private init() {
		this.spinnerService.show();

		this.route.params.subscribe(params => {
			this.placeService.getPlace(params["id"]).subscribe((data: Place) => {
				this.lat = Number.parseFloat(`${data.latitud}`);
				this.lng = Number.parseFloat(`${data.longitud}`);
				this.spinnerService.hide();
			});
		});
		
	}

	goBack() {
		this.location.back();
	}

}
