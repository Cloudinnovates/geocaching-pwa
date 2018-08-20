import { Injectable } from '@angular/core';
import { Place } from '../models/Place.model';
import { MapService } from './map.service';
import { PlaceService } from './place.service';
import { RatingService } from './rating.service';
import { NotificactionService } from './notificaction.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private mapSvc: MapService,
        private placeSvc: PlaceService,
        private ratingSvc: RatingService,
        private notificationSvc: NotificactionService) {}

    private getPlaces(): Place[] {
        const places = localStorage.getItem("places");
        if(places === null) return [];
        return JSON.parse(places);
    }

    public savePlace(place: Place) {
        const places = this.getPlaces();
        const newPlaces = [...places, place];
        localStorage.setItem("places", JSON.stringify(newPlaces));
    }

    public async syncAllPlaces() {
        const places = this.getPlaces();
        const showMsg = places.length > 0;

        for(const place of places){
            try {
                let latLng = await this.mapSvc.getLatLng(place.direccion);
                if (latLng !== null) {
                    place.latitud = latLng.lat;
                    place.longitud = latLng.lng;
                }
            } catch(e) {
                console.log(e);
            }

            const newPlace = await this.placeSvc.createPlace(place);
            if (place.rating !== 0)
                await this.ratingSvc.saveRatingPlace(newPlace.id, place.idUser, place.rating);
        }

        if(showMsg){
            this.notificationSvc.showNotification("Se han sincronizado todo los datos");
            localStorage.removeItem("places");
        }
    }

}


