import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Rating } from '../models/Rating.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RatingService {

    private url: string = environment.firebase.databaseURL;

    constructor(private fbDatabase: AngularFireDatabase, private http: HttpClient){
    }

    saveRatingPlace(idPlace: string, idUser: string, rating: number): Promise<any> {
        const stars = { rating };
        return this.fbDatabase.database.ref(`/ratings/${idPlace}/${idUser}`).set(stars);
    }

    getRatingPlace(idPlace: string): Observable<Rating[]> {
        return this.http.get(`${this.url}/ratings/${idPlace}.json`).pipe(
            map(response => {
                const rating: Rating[] = [];
                if (response !== null) {
                    const keys = Object.keys(response);
                    for (const key of keys)
                        rating.push(response[key]);
                }
                return rating;
            })
        );
    }

    deleteRating(idPlace: string): Promise<any> {
        return this.fbDatabase.database.ref(`/ratings/${idPlace}`).remove();
    }

}
