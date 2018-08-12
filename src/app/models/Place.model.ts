export class Place {

	constructor(public id: string = "",
		public nombre: string = "",
		public direccion: string = "",
		public categoria: string = "",
		public descripcion: string = "",
		public latitud: number = 0,
		public longitud: number = 0,
		public idRegion: string = "",
		public rating: number = 0,
		public foto: string = "",
		public idUser: string = "") { }

}
