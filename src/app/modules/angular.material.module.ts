import { NgModule } from "@angular/core";
import { MatSnackBarModule, MatSelectModule, MatListModule, MatToolbarModule, MatDialogModule, MatButtonModule, MatBottomSheetModule } from "@angular/material";

@NgModule({
    declarations: [
    ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        MatListModule,
        MatSelectModule,
        MatSnackBarModule,
        MatBottomSheetModule
    ],
    entryComponents: [],
    providers: [],
    bootstrap: [],
    exports: [
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        MatListModule,
        MatSelectModule,
        MatSnackBarModule,
        MatBottomSheetModule
    ]
})
export class AngularMaterialModule { }
