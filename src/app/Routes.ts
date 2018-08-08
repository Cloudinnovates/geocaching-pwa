import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'register-user', component: RegisterUserComponent }
];

export const PWARoutes = RouterModule.forRoot(routes);
