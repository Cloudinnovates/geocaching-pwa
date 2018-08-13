import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
})
export class RatingService {

    constructor(private fbDatabase: AngularFireDatabase) {
    }

    saveRatingPlace(idPlace: string, idUser: string, rating: number): Promise<any> {
        const stars = { rating };
        return this.fbDatabase.database.ref(`/ratings/${idPlace}/${idUser}`).set(stars);
    }

    getRatingPlace(idPlace: string) {
        return this.fbDatabase.list(`/ratings/${idPlace}`).valueChanges();
    }

    deleteRating(idPlace: string): Promise<any> {
        return this.fbDatabase.database.ref(`/ratings/${idPlace}`).remove();
    }

}
