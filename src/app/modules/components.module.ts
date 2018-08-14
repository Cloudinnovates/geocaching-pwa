import { NgModule } from "@angular/core";
import { DialogComponent } from "../components/dialogs/dialog/dialog.component";
import { AlertComponent } from "../components/dialogs/alert/alert.component";
import { EditPlaceComponent } from "../components/edit-place/edit-place.component";
import { OptionPlaceComponent } from "../components/option-place/option-place.component";
import { CreatePlaceComponent } from "../components/create-place/create-place.component";
import { PlaceMapComponent } from "../components/place-map/place-map.component";
import { MapComponent } from "../components/map/map.component";
import { ListPlacesComponent } from "../components/list-places/list-places.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { ListRegionComponent } from "../components/list-region/list-region.component";
import { RegisterUserComponent } from "../components/register-user/register-user.component";
import { LoginComponent } from "../components/login/login.component";
import { AppComponent } from "../app.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterUserComponent,
        ListRegionComponent,
        ProfileComponent,
        ListPlacesComponent,
        MapComponent,
        PlaceMapComponent,
        CreatePlaceComponent,
        OptionPlaceComponent,
        EditPlaceComponent,
        AlertComponent,
        DialogComponent
    ],
    imports: [
    ],
    entryComponents: [OptionPlaceComponent, AlertComponent, DialogComponent],
    providers: [],
    bootstrap: []
})
export class ComponentsModule { }
