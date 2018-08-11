import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public user: User;

    constructor(private sesion: SesionService, private router: Router, private userService: UserService) { }

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
    
    closeSesion() {
        this.userService.signOut().then(() => {
            this.sesion.closeSesion();
            this.router.navigateByUrl("/");
        });
    }

}
