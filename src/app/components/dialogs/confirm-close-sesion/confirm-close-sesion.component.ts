import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { SesionService } from '../../../services/sesion.service';

@Component({
	selector: 'app-confirm-close-sesion',
	templateUrl: './confirm-close-sesion.component.html',
	styleUrls: ['./confirm-close-sesion.component.css']
})
export class ConfirmCloseSesionComponent implements OnInit {

	constructor(private sesion: SesionService,
		private router: Router,
		private userService: UserService) { }

	ngOnInit() {
	}

	closeSesion() {
		this.userService.signOut().then(() => {
			this.sesion.closeSesion();
			this.router.navigateByUrl("/");
		});
	}

}
