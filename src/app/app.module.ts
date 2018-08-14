import { PlaceService } from './services/place.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { PWARoutes } from './Routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SesionService } from './services/sesion.service';
import { UserService } from './services/user.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './services/toast.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ListRegionComponent } from './components/list-region/list-region.component';
import { RegionService } from './services/region.service';
import { ProfileComponent } from './components/profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ListPlacesComponent } from './components/list-places/list-places.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PlaceMapComponent } from './components/place-map/place-map.component';
import { CreatePlaceComponent } from './components/create-place/create-place.component';
import { MatSelectModule } from '@angular/material/select';
import { MapService } from './services/map.service';
import { HttpClientModule } from '@angular/common/http';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { OptionPlaceComponent } from './components/option-place/option-place.component';
import { EditPlaceComponent } from './components/edit-place/edit-place.component';
import { AlertComponent } from './components/dialogs/alert/alert.component';
import { AlertService } from './services/alert.service';
import { DialogComponent } from './components/dialogs/dialog/dialog.component';
import { StarRatingModule } from 'angular-star-rating';
import { RatingService } from './services/rating.service';
import { MessagingService } from './services/messaging.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
        BrowserModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        PWARoutes,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularFireStorageModule,
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        MatListModule,
        MatSelectModule,
        HttpClientModule,
        MatBottomSheetModule,
        MatSnackBarModule,
        StarRatingModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        ToastrModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: environment.google_key
        }),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    entryComponents: [OptionPlaceComponent, AlertComponent, DialogComponent],
    providers: [RatingService, SesionService, UserService, ToastService, RegionService, PlaceService, MapService, AlertService, MessagingService],
    bootstrap: [AppComponent]
})
export class AppModule { }
