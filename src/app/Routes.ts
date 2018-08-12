import { MapComponent } from './components/map/map.component';
import { ListPlacesComponent } from './components/list-places/list-places.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ListRegionComponent } from './components/list-region/list-region.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register-user', component: RegisterUserComponent },
    { path: 'regions', component: ListRegionComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'place/:id', component: ListPlacesComponent, canActivate: [AuthGuardService] },
    { path: 'map/:id', component: MapComponent, canActivate: [AuthGuardService] }
];

export const PWARoutes = RouterModule.forRoot(routes);
