import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    constructor(private fbDatabase: AngularFireDatabase) {
    }

    getAll(): Observable<{}[]> {
        return this.fbDatabase.list("/regiones").valueChanges();
    }
}
