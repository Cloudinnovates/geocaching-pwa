export class FirebaseUtil {

	private static readonly ERROR_MESSAGES = {
		"auth/user-disabled": "Usuario deshabilitado",
		"auth/user-not-found": "Correo y/o contraseña incorrecta",
		"auth/wrong-password": "Contraseña incorrecta",
		"auth/email-already-in-use": "Correo se encuentra registrado",
		"auth/invalid-email": "Debe ingresar un correo válido",
		"auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
		"auth/account-exists-with-different-credential": "El correo se encuentra asociado a otra contraseña"
	};

	public static getErrorMessage(code: string): string{
		return FirebaseUtil.ERROR_MESSAGES[code];
	}

}
