import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase'
import { take } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/Message.model';

@Injectable({
	providedIn: 'root'
})
export class MessagingService {
	currentMessage = new BehaviorSubject(null);
	messaging = firebase.messaging();
	private key = "AAAAqAL-vNU:APA91bHg92nLXt0ejPi-Ka7cEdmV2N726uJzLdvB2YqUd3uroo55xm1TFqtBfamgc5Ci8gq8MyusNJizA-FN-633Y8nYW8hQcAT7GsOlMQLDc5qS_q8fz1g76YJ1vndK0Jdr5nWYuAd6Q_6oSRiLqeDNXywmnZCy4g";

	constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private http: HttpClient) { }

	updateToken(token) {
		this.afAuth.authState.pipe(take(1)).subscribe(user => {
			if (!user) return

			const data = { [user.uid]: token }
			this.db.object('fcmTokens/').update(data);

		})
	}

	getPermission() {
		this.messaging.requestPermission().then(() => {
			console.log('Notification permission granted.');
			return this.messaging.getToken();
		}).then(token => {
			console.log(token);
			this.updateToken(token);
		}).catch(err => {
			console.log('Unable to get permission to notify.', err);
		})
	}

	receiveMessage() {
		this.messaging.onMessage(payload => {
			console.log('Message received.', payload);
			this.currentMessage.next(payload);
		})
	}

	sendNotification(message: Message) {
		let headers = new HttpHeaders().set('Content-Type','application/json').set("Authorization", `key=${this.key}`);

		const params = {
			"notification": { 
				"title": message.title, 
				"body": message.body,
				"icon": message.icon, 
				"click_action": message.action
				
			}, 
			"registration_ids" : message.tokens
		};

		const paramJSON = JSON.stringify(params);

		this.http.post("https://fcm.googleapis.com/fcm/send", paramJSON, {headers: headers}).subscribe(data => console.log(data));
	}


}