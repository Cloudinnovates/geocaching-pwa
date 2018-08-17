import { LatLng } from '../models/LatLng.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MapService {

    private API_KEY: string = environment.google_key;

	constructor(private http: HttpClient) { }

	public getLatLng(address: string): Promise<LatLng>{
        return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=${address}`)
            .toPromise().then((response: any) => {
                if (response.status === 'ZERO_RESULTS') return null;
                const location = response.results[0].geometry.location;
                return new LatLng(location.lat, location.lng);
            });
	}

}
