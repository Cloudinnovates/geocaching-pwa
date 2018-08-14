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
import { RoutingModule } from "./routing.module";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { environment } from "../../environments/environment";
import { StarRatingModule } from "angular-star-rating";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireStorageModule } from "angularfire2/storage";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "angularfire2";
import { AngularMaterialModule } from "./angular.material.module";

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
    entryComponents: [OptionPlaceComponent, AlertComponent, DialogComponent],
    imports: [
        RoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        BrowserAnimationsModule,
        AngularFireStorageModule,
        HttpClientModule,
        AngularMaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        ToastrModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        StarRatingModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: environment.google_key
        })
    ]
})
export class ComponentsModule { }
