import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { User } from '../../models/User.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public user: User;

    constructor(private sesion: SesionService) { }

    ngOnInit() {
        this.user = this.sesion.getUser();
    }

}
