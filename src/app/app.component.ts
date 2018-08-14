import { Component } from '@angular/core';
import { fadeAnimation } from './util/animatios';
import { MessagingService } from './services/messaging.service';
import { AlertService } from './services/alert.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [fadeAnimation]
})
export class AppComponent {
	title = 'geocaching-pwa';

	constructor(private messaging: MessagingService,
		private alert: AlertService,
		private snackBar: MatSnackBar) {
		this.init();
	}

	private init() {
		this.messaging.getPermission();
		this.messaging.receiveMessage();
		this.messaging.currentMessage.subscribe(data => {
			if (data !== null) {
				this.snackBar.open(data.notification.body, "Cerrar", { duration: 5000 });
				//this.alert.show(data.notification.body);
			}
		});
	}

}
