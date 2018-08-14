import { MapService } from './../../services/map.service';
import { ToastService } from './../../services/toast.service';
import { PlaceService } from './../../services/place.service';
import { Place } from './../../models/Place.model';
import { SesionService } from './../../services/sesion.service';
import { User } from './../../models/User.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from '../../../../node_modules/ng4-loading-spinner';
import { RatingService } from '../../services/rating.service';
import { FileUtil } from '../../util/File';
import { Message } from '../../models/Message.model';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
    selector: 'app-create-place',
    templateUrl: './create-place.component.html',
    styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {

    private idRegion: string;
    public formRegister: FormGroup;
    public photo: any;
    private user: User;

    constructor(private location: Location,
        private route: ActivatedRoute,
        private spinner: Ng4LoadingSpinnerService,
        private sesion: SesionService,
        private placeService: PlaceService,
        private toast: ToastService,
        private mapService: MapService,
        private ratingService: RatingService,
        private userService: UserService,
        private messaging: MessagingService) {
        this.initForm();
    }

    private initForm() {
        this.formRegister = new FormGroup({
            nombre: new FormControl("", Validators.required),
            direccion: new FormControl("", Validators.required),
            categoria: new FormControl("", Validators.required),
            descripcion: new FormControl("", [Validators.required, Validators.maxLength(255)]),
            rating: new FormControl("")
        });
    }

    ngOnInit() {
        this.user = this.sesion.getUser();
        this.route.params.subscribe(params => {
            this.idRegion = params["id"];
        });
    }

    goBack() {
        this.location.back();
    }

    doSubmit() {
        this.spinner.show();

        const idUser = this.user.id;
        const nombre = this.formRegister.get("nombre").value;
        const direccion = this.formRegister.get("direccion").value;
        const categoria = this.formRegister.get("categoria").value;
        const descripcion = this.formRegister.get("descripcion").value;
        const rating = this.formRegister.get("rating").value as number;

        const place: Place = new Place("", nombre, direccion, categoria, descripcion, 0, 0, this.idRegion, rating, "", idUser);
        if (this.photo !== "" || this.photo !== undefined) place.foto = this.photo;

        this.mapService.getLatLng(direccion).then(response => {
            if (response === null) {
                this.spinner.hide();
                this.toast.showError("Dirección no encontrada");
                return false;
            }

            place.latitud = response.lat;
            place.longitud = response.lng;

            this.placeService.createPlace(place).then((newPlace) => {
                this.ratingService.saveRatingPlace(newPlace.id, idUser, rating);
                this.spinner.hide();
                this.toast.showSuccess("Lugar creado exitosamente");
                this.postCreatePlace(newPlace);
            });

        });


    }

    selectPhoto() {
        document.getElementById("file").click();
    }

    changeListener($event): void {
        const reader = FileUtil.changeSelectFile($event);
        reader.onloadend = () => {
            this.photo = reader.result;
            this.toast.showSuccess("Foto subida");
        }
    }

    private postCreatePlace(place: Place) {
        const url = `${environment.host}/edit-place/${place.id}`;
        const body = `Se ha creado ${place.nombre} en ${place.direccion}`;
        
        this.userService.getAlltokens().subscribe((tokens: string[]) => {
            const message = new Message("Nuevo lugar", body, tokens, url);
            this.messaging.sendNotification(message);
        });
    }

}
