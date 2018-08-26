import { SesionService } from './sesion.service';
import { Place } from '../models/Place.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { RatingService } from './rating.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PlaceService {

	private url: string = environment.firebase.databaseURL;
	private authToken: string = "";

	constructor(private fbDatabase: AngularFireDatabase,
        private storage: AngularFireStorage,
		private rating: RatingService,
		private http: HttpClient,
		private sesion: SesionService) {
			this.authToken = this.sesion.getUser().token;
	}

	public getPlaces(){
		return this.fbDatabase.list("/lugares/");
	}

	public getPlace(id: string){
		return this.fbDatabase.object(`/lugares/${id}`).valueChanges();
	}

	public savePhoto(photo: string, idPlace: string): Promise<string> {
		if(photo === "" || photo === undefined) return new Promise((resolve) => { return resolve(""); });
		return this.storage.ref(`/place_photo/${idPlace}`).putString(photo, "data_url").then(() => {
			return this.getPhoto(idPlace).then(url => url).catch(error => "");
		});
	}

	public getPhoto(idPlace: string): Promise<string>{
		const storageRef = this.storage.storage.ref().child(`/place_photo/${idPlace}`);
    	return storageRef.getDownloadURL().then(url => url);
	}

	public createPlace(lugar: Place): Promise<Place> {
		const idPlace = this.fbDatabase.database.ref().child("/lugares").push().key;
		lugar.id = idPlace;

		return this.savePhoto(lugar.foto, lugar.id).then(url => {
			lugar.foto = url;
			return lugar;
		}).then(lugar => {
			this.fbDatabase.database.ref(`/lugares/${idPlace}`).set(lugar);
			return lugar;
		});
	}

	public editPlace(lugar: Place): Promise<any>{
		return this.fbDatabase.database.ref(`/lugares/${lugar.id}`).set(lugar);
	}

	public deletePlace(id: string): Promise<any>{
        this.rating.deleteRating(id);
		return this.fbDatabase.database.ref(`/lugares/${id}`).remove();
	}

	public getPlacesByIdRegion(idRegion: string): Observable<Place[]> {
		return this.http.get(`${this.url}/lugares.json?orderBy="idRegion"&equalTo="${idRegion}"&auth=${this.authToken}`).pipe(
            map(response => {
                const lugares: Place[] = [];

                if (response !== null) {
                    const keys = Object.keys(response);

                    for (let key of keys)
                        lugares.push(response[key]);

                    for (let i = 0; i < lugares.length; i++) {
                        this.rating.getRatingPlace(lugares[i].id).subscribe(response => {
                            const ratings = response.map((v: any) => v.rating);
                            const rating = ratings.length > 0 ? ratings.reduce((total, val) => total + val) / ratings.length : 0;
                            lugares[i].rating = rating;
                        });
                    }
                }

                return lugares;
            })
        );
	}
}
