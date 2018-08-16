import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Region } from '../models/Region.model';
@Injectable({
    providedIn: 'root'
})
export class RegionService {

    private url: string = environment.firebase.databaseURL;

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Region[]> {
        return this.http.get<Region[]>(`${this.url}/regiones.json`);
    }

    public getRegion(id: string): Observable<Region>{
        return this.http.get<Region>(`${this.url}/regiones/${id}.json`);
	}
}
