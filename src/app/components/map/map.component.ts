import { Region } from './../../models/Region.model';
import { Place } from './../../models/Place.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PlaceService } from './../../services/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	public places: Place[] = [];
	public region: Region = new Region();
	public lat: number = 0;
	public lng: number = 0;

	constructor(private spinnerService: Ng4LoadingSpinnerService,
		private palceService: PlaceService,
		private location: Location) {
		this.init();
	}

	ngOnInit() { }

	private init() {

		this.spinnerService.show();

		this.region = JSON.parse(localStorage.getItem("region")) as Region;
		this.lat = Number.parseFloat(`${this.region.latitud}`);
		this.lng = Number.parseFloat(`${this.region.longitud}`);

		this.palceService.getPlacesByIdRegion(this.region.id).subscribe((data: Place[]) => {
			this.places = data;
			this.spinnerService.hide();
		});

	}

	goBack() {
		this.location.back();
	}

}
