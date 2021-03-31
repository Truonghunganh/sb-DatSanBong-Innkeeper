import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { environment } from './../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        private authService: AuthService,

    ) {}
    id=0;
    idquan=0;
    checkquan=false;
    quan:any;
    url = environment.url;
    ngOnInit() {
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        console.log(this.id);
        this.getSanByInnkeeper(this.id);
    }
    getSanByInnkeeper(id:number){
        this.checkquan=false;
        this.checksan=false;
        this.dashboardService.getSanByInnkeeperVaId(id).subscribe(
            data=>{
                console.log(data);
                if (data.status) {
                   this.idquan=data.san.idquan;
                   this.san = data.san;
                   this.checksan=true;
                   this.quan = data.quan;
                   this.reviewquan = Math.round(data.quan.review);
                   this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                   this.checkquan=true;
                   this.changeDetectorRef.detectChanges();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: data.message,
                    })

                   this.router.navigate(['dashboard/quans']);
                }
           }
            
        )
    }
    mangreviewquan: any;
    reviewquan = 0;

    taomotmangreview(review: number) {
        switch (review) {
            case 0: return [false, false, false, false, false];
            case 1: return [true, false, false, false, false];
            case 2: return [true, true, false, false, false];
            case 3: return [true, true, true, false, false];
            case 4: return [true, true, true, true, false];
            case 5: return [true, true, true, true, true];
            default:
                break;
        }
    }



    edit(name: string, numberpeople: number, priceperhour:number){
        
        Swal.fire({
            title: "bạn có muốn thay đổi thông tin của sân này hay không?",
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
