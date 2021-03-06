import { NgModule } from "@angular/core";
import { RatingService } from "../services/rating.service";
import { SesionService } from "../services/sesion.service";
import { UserService } from "../services/user.service";
import { ToastService } from "../services/toast.service";
import { RegionService } from "../services/region.service";
import { PlaceService } from "../services/place.service";
import { MapService } from "../services/map.service";
import { AlertService } from "../services/alert.service";
import { MessagingService } from "../services/messaging.service";
import { NotificactionService } from "../services/notificaction.service";
import { StorageService } from "../services/storage.service";

@NgModule({
    providers: [
        RatingService,
        SesionService,
        UserService,
        ToastService,
        RegionService,
        PlaceService,
        MapService,
        AlertService,
        MessagingService,
        NotificactionService,
        StorageService
    ]
})
export class ServicesModule { }
