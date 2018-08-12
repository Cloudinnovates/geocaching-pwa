import { Place } from './../models/Place.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PlaceService {

	constructor(private fbDatabase: AngularFireDatabase, 
		private storage: AngularFireStorage) {
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

	public createPlace(lugar: Place): Promise<Place>{
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

	public editPlace(lugar: Place){
		return this.fbDatabase.database.ref(`/lugares/${lugar.id}`).set(lugar);
	}

	public deletePlace(id: string): Promise<any>{
		return this.fbDatabase.database.ref(`/lugares/${id}`).remove();
	}

	public getPlacesByIdRegion(idRegion: string) {
		return this.fbDatabase.list("/lugares", ref => ref.orderByChild("idRegion").equalTo(parseInt(idRegion))).valueChanges();

	}
}
