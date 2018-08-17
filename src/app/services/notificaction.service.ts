import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class NotificactionService {
    constructor(private alertService: AlertService) {}

    private getNotification(title: string, message: string) {
        new Notification(title, {
            body: message,
            icon: '/icon.png'
        });
    }

    public async showNotification(message: string) {
        if (!('Notification' in window)) {
            this.alertService.show('This browser does not support system notifications');
            return;
        }
        else if ((Notification as any).permission === 'granted') {
            this.getNotification('Notificación', message);
        }
        else if ((Notification as any).permission !== 'denied') {
            const granted = await Notification.requestPermission();
            if (granted) {
                this.getNotification('Notificación', message);
            }
        }
    }
}
