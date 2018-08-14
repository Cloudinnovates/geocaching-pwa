import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ServicesModule } from './modules/services.module';
import { AngularMaterialModule } from './modules/angular.material.module';
import { ComponentsModule } from './modules/components.module';
import { RoutingModule } from './modules/routing.module';

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        RoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        AngularMaterialModule,
        ComponentsModule,
        ServicesModule
    ],
    entryComponents: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
