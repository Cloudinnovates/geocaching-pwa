import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { SesionService } from '../../services/sesion.service';
import { ToastService } from '../../services/toast.service';
import { FirebaseUtil } from '../../util/FirebaseUtil';
import { Ng4LoadingSpinnerService, Ng4LoadingSpinnerComponent } from 'ng4-loading-spinner';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    @ViewChild(Ng4LoadingSpinnerComponent) spinner: Ng4LoadingSpinnerComponent;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private sesion: SesionService,
        private toast: ToastService,
        private spinnerService: Ng4LoadingSpinnerService,
        private router: Router) {
		this.loginForm = this.fb.group({
			correo: ["", Validators.required],
			password: ["", Validators.required]
		});
	}

	ngOnInit() {
	}

	doLogin() {
        this.spinner.loadingText = "Validando usuario ...";
        this.spinnerService.show();

        const correo = this.loginForm.get("correo").value;
        const password = this.loginForm.get("password").value;

        this.userService.doLogin(correo, password).then(user => {
            this.spinnerService.hide();
            this.sesion.saveUser(user);
            this.router.navigateByUrl("/regions");
        }).catch(error => {
            this.spinnerService.hide();
            this.toast.showError(FirebaseUtil.getErrorMessage(error.code));
        });
    }

    loginFacebook() {
        this.userService.loginWithFacebook().then(response => {
            if(response !== null){
                this.sesion.saveUser(response);
                this.router.navigateByUrl("/regions");
                return false;
            }
            this.toast.showError("Error login con facebook");
        });
    }

    goToRegister() {
        this.router.navigateByUrl("/register-user");
    }

}
