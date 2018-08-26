import { SesionService } from './sesion.service';
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
    private authToken: string = "";
    
    constructor(private http: HttpClient, private sesion: SesionService) {
        this.authToken = this.sesion.getUser().token;
    }

    getAll(): Observable<Region[]> {
        return this.http.get<Region[]>(`${this.url}/regiones.json?auth=${this.authToken}`);
    }

    public getRegion(id: string): Observable<Region>{
        return this.http.get<Region>(`${this.url}/regiones/${id}.json?auth=${this.authToken}`);
	}
}
