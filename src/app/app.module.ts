import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { PWARoutes } from './Routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ToastrModule } from 'ngx-toastr';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AgmCoreModule } from '@agm/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingModule } from 'angular-star-rating';
import { ServicesModule } from './modules/services.module';
import { AngularMaterialModule } from './modules/angular.material.module';
import { ComponentsModule } from './modules/components.module';

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        PWARoutes,
        AngularMaterialModule,
        ComponentsModule,
        ServicesModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularFireStorageModule,
        HttpClientModule,
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
    entryComponents: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
