import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private options = {
        closeButton: true,
        progressBar: true,
        timeOut: 5000,
        positionClass: "toast-top-full-width"
    }

    constructor(private toastr: ToastrService) { }

    public showSuccess(message: string, title: string = "") {
        this.toastr.success(message, title, this.options);
    }

    public showError(message: string, title: string = "") {
        this.toastr.error(message, title, this.options);
    }

    public showWarning(message: string, title: string = "") {
        this.toastr.warning(message, title, this.options);
    }

}
