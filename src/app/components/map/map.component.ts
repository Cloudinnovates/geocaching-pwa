import { ActivatedRoute } from '@angular/router';
import { Region } from '../../models/Region.model';
import { Place } from '../../models/Place.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PlaceService } from '../../services/place.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RegionService } from '../../services/region.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    public places: Place[] = [];
    public lat: number = 0;
    public lng: number = 0;

    constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        private placeService: PlaceService,
        private location: Location,
        private regionService: RegionService
    ) {}

    ngOnInit() {
        this.init();
    }

    private init() {
        this.spinnerService.show();

        this.route.params.subscribe(params => {
            const idRegion: string = `${params['id']}`;
            this.regionService.getRegion(idRegion).subscribe((data: Region) => {
                this.lat = Number.parseFloat(`${data.latitud}`);
                this.lng = Number.parseFloat(`${data.longitud}`);
                this.placeService
                    .getPlacesByIdRegion(idRegion)
                    .subscribe((data: Place[]) => {
                        this.places = data;
                        this.spinnerService.hide();
                    });
            });
        });
    }

    goBack() {
        this.location.back();
    }
}
