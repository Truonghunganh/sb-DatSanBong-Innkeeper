import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Innkeeper, San } from '../../models/dashboard.model';

import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-add-san-by-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-san-by-innkeeper.component.html',
    styleUrls: ['add-san-by-innkeeper.component.scss'],
})
export class AddSanByInnkeeperComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private router: Router,
        private activatedRoute: ActivatedRoute, 
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {}
    ngOnInit() {
        this.idquan=Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        console.log(this.idquan);
        
        this.checkTokenInnkeeperAndIdquan(this.idquan);
    }
    checkquan=false;
    quan:any;
    url = environment.url;
    idquan=0;
    checkTokenInnkeeperAndIdquan(idquan: number) {
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            console.log(data);

            if (!data.status) {
                this.router.navigate(['/dashboard/quans' ])
            } else {
                this.getQuanByInnkeeper(idquan);
            }
        })
    }

    getQuanByInnkeeper(id: number){
        this.checkquan=false;
        this.dashboardService.getQuanById(id).subscribe(data=>{
            console.log(data);
            if(data.status){
                this.quan=data.quan;
                this.checkquan=true;
                this.changeDetectorRef.detectChanges();
            }
          
        })
    }
    Cancel(){
        this.router.navigate(['/dashboard/quans/'+this.idquan]);
    }
    Add(name:string, numberpeople:number, priceperhour: number){
        const san=new San(this.idquan,name,numberpeople,priceperhour);
        console.log(san);
        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                this.dashboardService.addSanByInnkeeper(san).subscribe(data => {
                    console.log(data);

                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/dashboard/quans/' + this.idquan]);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })

                    }
                })


            }
        }) 
        
    }
}
