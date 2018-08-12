import { ConfirmCloseSesionComponent } from './../dialogs/confirm-close-sesion/confirm-close-sesion.component';
import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { User } from '../../models/User.model';
import { MatDialog } from '../../../../node_modules/@angular/material/dialog';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public user: User;

    constructor(private sesion: SesionService, private dialog: MatDialog) { }

    ngOnInit() {
        this.user = this.sesion.getUser();
    }

    selectFile() {
        document.getElementById("file").click();
    }

    changeListener($event): void {
        let file: File = $event.target.files[0];
        console.log(file);
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            const image = myReader.result;
            console.log(image)
        }
        myReader.readAsDataURL(file);
    }

    getPhotoAvatar() {
		console.log(this.user);
		if (!this.user || !this.user.foto || this.user.foto === "") 
			return "assets/imgs/default-avatar.jpg";
		return this.user.foto;
    }

    openCloseSesion() {
        this.dialog.open(ConfirmCloseSesionComponent);
    }
    
    

}
