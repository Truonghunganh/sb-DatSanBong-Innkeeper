import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import {Innkeeper} from '../../models/dashboard.model';

import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-innkeeper-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './innkeeper-edit.component.html',
    styleUrls: ['innkeeper-edit.component.scss'],
})
export class InnkeeperEditComponent implements OnInit {

    
    constructor(
        private dashboardService: DashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authService: AuthService

    ) {
    }
    checkInnkeeper=false;
    innkeeper:any;
    ngOnInit() {
        this.checkInnkeeper=false;
        this.authService.checkTokenInnkeeper().subscribe(data=>{
            console.log(data);
            if(data.status){
                this.innkeeper=data.innkeeper;
                this.checkInnkeeper=true;
                this.changeDetectorRef.detectChanges();
            }
            
        })
    }
    Edit(name: string, gmail: string, address: string, password: string){
        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                const innkeeper=new Innkeeper(name,gmail,address,password);
                console.log(innkeeper);
                this.dashboardService.editInnkeeperByToken(innkeeper).subscribe(
                    data=>{
                        if(data.status){
                            Swal.fire({
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.router.navigate(['/dashboard/innkeeper'])
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
