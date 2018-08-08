import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public loginForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			correo: ["", Validators.required],
			password: ["", Validators.required]
		});
	}

	ngOnInit() {
	}

	doLogin() {
        const correo = this.loginForm.get("correo").value;
        const password = this.loginForm.get("password").value;

    }

    loginFacebook() {

    }

}
