import { RegionService } from '../../services/region.service';
import { Place } from '../../models/Place.model';
import { PlaceService } from '../../services/place.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OptionPlaceComponent } from '../option-place/option-place.component';
import { ToastService } from '../../services/toast.service';
import { RatingService } from '../../services/rating.service';

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

    constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        private palceService: PlaceService,
        private router: Router,
        private regionService: RegionService,
        private bottomSheet: MatBottomSheet,
        private toast: ToastService,
        private ratingService: RatingService
    ) {}

    ngOnInit() {
        this.spinnerService.show();
        this.route.params.subscribe(params => {
            this.idRegion = params['id'];

            this.palceService
                .getPlacesByIdRegion(this.idRegion)
                .subscribe((data: Place[]) => {
                    this.places = data;
                    this.showEmptyMessge = this.places.length === 0;
                    this.spinnerService.hide();
                });

            this.spinnerService.show();
        });
    }

    private getPlaces() {
        this.palceService.getPlacesByIdRegion(this.idRegion).subscribe((data: Place[]) => {
            this.places = data;
            this.showEmptyMessge = this.places.length === 0;
        });
    }

    getPhoto(photo: string) {
        if (photo) return photo;
        return 'assets/imgs/card-default.jpg';
    }

    goToMap() {
        this.regionService.getRegion(this.idRegion).subscribe(data => {
            this.router.navigateByUrl(`/map/${this.idRegion}`);
        });
    }

    goToMapPlace(id: string) {
        this.router.navigateByUrl(`/place-map/${id}`);
    }

    openOptions(idPlace: string) {
        this.hideRegisterBtn = true;
        const btnRef = this.bottomSheet.open(OptionPlaceComponent, {
            data: { idPlace, updatePlace: () => this.getPlaces() }
        });

        btnRef.afterDismissed().subscribe(() => {
            this.hideRegisterBtn = false;
        });
    }

    updateRating($event, idPlace: string, idUser: string) {
        const rating = $event.rating;
        this.ratingService.saveRatingPlace(idPlace, idUser, rating).then(() => {
            this.toast.showSuccess('Rating actualizado ...');
        });
    }
}
