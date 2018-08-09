import { Social } from '../util/Social';

export class User {

	constructor(public email: string = "",
		public nombre: string = "",
		public apellido: string = "",
		public password: string = "",
		public id: string = "",
		public foto: string = "",
		public social: string = "",
	){
		this.social = Social.EMAIL;
	}

}
