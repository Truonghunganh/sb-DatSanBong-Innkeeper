import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-get-quans-by-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './get-quans-by-innkeeper.component.html',
    styleUrls: ['get-quans-by-innkeeper.component.scss'],
})
export class GetQuansByInnkeeperComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef

    ) { }
    listquans: any;
    checkquans = false;
    url = environment.url;
    urlCLU = environment.urlCLU;
    ngOnInit() {
        this.checktoken();

    }

    checktoken() {
        this.authService.checkTokenInnkeeper().subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/auth/login']);
            } else {
                this.getListquans();
            }
        })
    }
    getListquans() {
        this.checkquans= false;
        this.dashboardService.getListQuansByTokenInnkeeper().subscribe(data=>{
            console.log(data);
            
            if(data.status){
                this.listquans=data.quans;
                this.checkquans=true;
                this.changeDetectorRef.detectChanges();

            }
            else{
                
            }
        })
    }
}
