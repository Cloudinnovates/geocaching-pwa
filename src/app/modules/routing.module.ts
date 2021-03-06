import { NgModule } from "@angular/core";
import { LoginComponent } from "../components/login/login.component";
import { RegisterUserComponent } from "../components/register-user/register-user.component";
import { ListRegionComponent } from "../components/list-region/list-region.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { ListPlacesComponent } from "../components/list-places/list-places.component";
import { MapComponent } from "../components/map/map.component";
import { PlaceMapComponent } from "../components/place-map/place-map.component";
import { CreatePlaceComponent } from "../components/create-place/create-place.component";
import { EditPlaceComponent } from "../components/edit-place/edit-place.component";
import { AuthGuardService } from "../guards/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register-user', component: RegisterUserComponent },
    { path: 'regions', component: ListRegionComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'place/:id', component: ListPlacesComponent, canActivate: [AuthGuardService] },
    { path: 'map/:id', component: MapComponent, canActivate: [AuthGuardService] },
    { path: 'place-map/:id', component: PlaceMapComponent, canActivate: [AuthGuardService] },
    { path: 'create-place/:id', component: CreatePlaceComponent, canActivate: [AuthGuardService] },
    { path: 'edit-place/:id', component: EditPlaceComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule { }
