import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Innkeeper } from '../../models/dashboard.model';

import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-edit-quan-by-token-innkeepe',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-quan-by-token-innkeepe.component.html',
    styleUrls: ['edit-quan-by-token-innkeepe.component.scss'],
})
export class EditQuanByTokenInnkeepeComponent implements OnInit {
    @ViewChild('myPond') myPond: any;
    pondOptions = {
        class: 'my-filepond',
        multiple: true,
        labelIdle: 'Drop files here',
        acceptedFileTypes: 'image/jpeg, image/png',
    };
    file: any;
    pondHandleAddFile(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        } else {
            Swal.fire('please , you select the image again');
        }
    }
    pondHandleInit() { }

    constructor(
        private dashboardService: DashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,

    ) {}
    url = environment.url;

    checkquan=false;
    quan:any;
    idquan:number=0;
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        console.log(this.idquan);
        
        this.getQuanByInnkeeper(this.idquan);

    }
    getQuanByInnkeeper(id: number){
        this.checkquan=false;
        this.dashboardService.getQuanByInnkeeper(id).subscribe(data=>{
            console.log(data);
            if (data.status) {
                this.quan=data.quan;
                this.checkquan=true;
                this.changeDetectorRef.detectChanges();   
            }
        })
    }
    edit(name:string, address:string, linkaddress: string){
        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                if (this.file) {
                    formData.append('image', this.file, this.file.name);
                }
                formData.append('id', this.idquan+"");
                formData.append('name', name);
                formData.append('address', address);
                formData.append('linkaddress', linkaddress);
                this.dashboardService.editQuanByTokenInnkeeper(formData).subscribe(data => {
                    console.log(data);

                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/dashboard/quans'])
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
