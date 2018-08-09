import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable({
    providedIn: 'root'
})
export class SesionService {

    private keyUser: string = "user";

    constructor() { }

    public isLogged(): boolean {
        const data = localStorage.getItem(this.keyUser);
        return data !== null;
    }

    public saveUser(user: User) {
        localStorage.setItem(this.keyUser, JSON.stringify(user));
    }

    public getUser(): User {
        const data = localStorage.getItem(this.keyUser);
        if(data === null) return new User();
        return JSON.parse(data);
    }

    public closeSesion() {
        localStorage.clear();
    }
}
