import { RegionService } from './../../services/region.service';
import { Place } from './../../models/Place.model';
import { PlaceService } from './../../services/place.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '../../../../node_modules/@angular/material/bottom-sheet';
import { OptionPlaceComponent } from '../option-place/option-place.component';

@Component({
	selector: 'app-list-places',
	templateUrl: './list-places.component.html',
	styleUrls: ['./list-places.component.css']
})
export class ListPlacesComponent implements OnInit {

	public places: Place[] = [];
	public showEmptyMessge: boolean = false;
	public idRegion: string;
	public hideRegisterBtn: boolean = false;

	constructor(private route: ActivatedRoute,
		private spinnerService: Ng4LoadingSpinnerService,
		private palceService: PlaceService,
		private router: Router,
		private regionService: RegionService,
		private bottomSheet: MatBottomSheet) { }

	ngOnInit() {
		this.spinnerService.show();
		this.route.params.subscribe(params => {
			this.idRegion = params["id"];

			this.palceService.getPlacesByIdRegion(this.idRegion).subscribe((data: Place[]) => {
				this.places = data;
				this.showEmptyMessge = this.places.length === 0;
				this.spinnerService.hide();
			});

			this.spinnerService.show();
		});
	}

	getPhoto(photo: string) {
		if (photo) return photo;
		return "assets/imgs/card-default.jpg";
	}

	goToMap(){
		this.regionService.getRegion(this.idRegion).subscribe(data => {
			localStorage.setItem("region", JSON.stringify(data));
			this.router.navigateByUrl(`/map/${this.idRegion}`);
		});
	}

	goToMapPlace(id: string){
		this.router.navigateByUrl(`/place-map/${id}`);
	}

	openOptions(idPlace: string) {
		this.hideRegisterBtn = true;
		const btnRef = this.bottomSheet.open(OptionPlaceComponent, {
			data: {idPlace}
		});

		btnRef.afterDismissed().subscribe(() => {
			this.hideRegisterBtn = false;
		});
	}

}
