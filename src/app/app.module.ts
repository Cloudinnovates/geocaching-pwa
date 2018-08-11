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
import { ConfirmCloseSesionComponent } from './components/dialogs/confirm-close-sesion/confirm-close-sesion.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterUserComponent,
        ListRegionComponent,
        ProfileComponent,
        ConfirmCloseSesionComponent
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
        MDBBootstrapModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        ToastrModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot()
    ],
    entryComponents: [ConfirmCloseSesionComponent],
    providers: [SesionService, UserService, ToastService, RegionService],
    bootstrap: [AppComponent]
})
export class AppModule { }
