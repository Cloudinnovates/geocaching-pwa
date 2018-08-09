import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SesionService } from '../../services/sesion.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService, Ng4LoadingSpinnerComponent } from 'ng4-loading-spinner';
import { FirebaseUtil } from '../../util/FirebaseUtil';
import { ToastService } from '../../services/toast.service';
import { User } from '../../models/User.model';
import { PasswordValidation } from '../../validators/PasswordValidator';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

    public registerForm: FormGroup;
    @ViewChild(Ng4LoadingSpinnerComponent) spinner: Ng4LoadingSpinnerComponent;

    constructor(private fb: FormBuilder,
        private userProvider: UserService,
        private sesion: SesionService,
        private spinnerService: Ng4LoadingSpinnerService,
        private router: Router,
        private toast: ToastService) {
            this.init();
        }

    ngOnInit() {
    }

    private init() {
        this.registerForm = this.fb.group({
            correo: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            repeatPassword: ["", Validators.required],
            nombre: ["", Validators.required],
            apellido: ["", Validators.required]
        }, {
			validator: PasswordValidation.MatchPassword
		});
    }

    doRegister() {
        this.spinner.loadingText = "Validando registro ...";
        this.spinnerService.show();

        const correo = this.registerForm.get("correo").value;
        const nombre = this.registerForm.get("nombre").value;
        const apellido = this.registerForm.get("apellido").value;
        const password = this.registerForm.get("password").value;

        let user = new User(correo, nombre, apellido, password);

        this.userProvider.createUser(user).then(response => {
            this.spinnerService.hide();
            this.sesion.saveUser(response);
            this.router.navigateByUrl("/regions");
        }).catch(error => {
            this.spinnerService.hide();
            this.toast.showError(FirebaseUtil.getErrorMessage(error.code));
        });
    }

}
