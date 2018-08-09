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

    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        var file: File = inputValue.files[0];
        console.log(file);
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            const image = myReader.result;
            console.log(image)
        }
        myReader.readAsDataURL(file);
    }

}
