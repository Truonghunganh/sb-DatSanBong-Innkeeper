import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { San1 } from '../../models/dashboard.model';

import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-edit-san-by-innkeepe',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-san-by-innkeepe.component.html',
    styleUrls: ['edit-san-by-innkeepe.component.scss'],
})
export class EditSanByInnkeepeComponent implements OnInit {
    checksan=false;
    san:any;
    constructor(
        private dashboardService: DashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,

    ) {}
    id=0;
    idquan=0;
    ngOnInit() {
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        console.log(this.id);
        
        this.getSanByInnkeeper(this.id);
    }
    getSanByInnkeeper(id:number){
        this.checksan=false;
        this.dashboardService.getSanByid(id).subscribe(
            data=>{
                console.log(data);
                
               if (data.status) {
                   this.idquan=data.san.idquan;
                   this.san = data.san;
                   this.checksan=true;
                   this.changeDetectorRef.detectChanges();
               }
           }
            
        )
    }

    edit(name: string, numberpeople: number, priceperhour:number){
        
        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                const san = new San1(this.id, name, Number(numberpeople), Number(priceperhour));
                console.log(san);

                this.dashboardService.editSanByInnkeeper(san).subscribe(data => {
                    console.log(data);

                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/dashboard/quans/'+this.idquan])
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
