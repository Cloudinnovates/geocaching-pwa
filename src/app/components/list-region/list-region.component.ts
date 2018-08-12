import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/Region.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-list-region',
    templateUrl: './list-region.component.html',
    styleUrls: ['./list-region.component.css']
})
export class ListRegionComponent implements OnInit {

    public regions: Region[] = [];

    constructor(private regionService: RegionService, private spinnerService: Ng4LoadingSpinnerService, private router: Router) {
    }

    ngOnInit() {
        this.spinnerService.show();

        this.regionService.getAll().subscribe((regions: Region[]) => {
            this.regions = regions;
            this.spinnerService.hide();
        });
    }

    getPhoto(url: any): string {
        if (url) return url;
        return "assets/imgs/card-default.jpg";
    }

    goToPlace(id: string){
        this.router.navigateByUrl(`/place/${id}`);
    }

}
