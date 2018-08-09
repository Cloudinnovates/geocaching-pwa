import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionService } from '../services/sesion.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(private sesion: SesionService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.sesion.isLogged())
            return true;

        // navigate to login page
        this.router.navigate(['/']);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    }

}
