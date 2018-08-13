import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { User } from '../../models/User.model';
import { MatDialog } from '../../../../node_modules/@angular/material/dialog';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialogs/dialog/dialog.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public user: User;

    constructor(private sesion: SesionService,
        private dialog: MatDialog,
        private toast: ToastService,
        private userService: UserService,
        private router: Router) { }

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
            this.user.foto = image;
            this.sesion.saveUser(this.user);
            this.userService.savePhoto(image, this.user.id).then(() => {
                this.toast.showSuccess("La foto ha sido actulizada");
            });
        }
        myReader.readAsDataURL(file);
    }

    getPhotoAvatar() {
        console.log(this.user);
        if (!this.user || !this.user.foto || this.user.foto === "")
            return "assets/imgs/default-avatar.jpg";
        return this.user.foto;
    }

    private closeSesion() {
        this.userService.signOut().then(() => {
            this.sesion.closeSesion();
            this.router.navigateByUrl("/");
        });
    }

    openCloseSesion() {
        this.dialog.open(DialogComponent, {
            data: {
                message: "¿ Desea cerrar sesión ?",
                acceptFunc: () => this.closeSesion()
            }
        });
    }

}
