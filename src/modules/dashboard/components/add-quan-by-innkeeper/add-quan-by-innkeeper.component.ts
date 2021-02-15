import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-add-quan-by-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-quan-by-innkeeper.component.html',
    styleUrls: ['add-quan-by-innkeeper.component.scss'],
})
export class AddQuanByInnkeeperComponent implements OnInit {
    @ViewChild('myPond') myPond: any;
    pondOptions = {
        class: 'my-filepond',
        multiple: true,
        labelIdle: 'Drop files here',
        acceptedFileTypes: 'image/jpeg, image/png',
    };
    file:any;
    pondHandleAddFile(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        } else {
            Swal.fire('please , you select the image again');
        }
    }
    pondHandleInit() { }


    constructor(private dashboardService: DashboardService,
         private router: Router) {
    }
   
    ngOnInit() {}
    Add(name: string, address:string, linkaddress: string){
        
        console.log(name);
        
        const formData = new FormData();
        formData.append('image', this.file,this.file.name);
        formData.append('name', name);
        formData.append('address', address);
        formData.append('linkaddress', linkaddress);
        this.dashboardService.addQuanByInnkeeper(formData).subscribe(data=>{
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
    
    Cancel(){
        this.router.navigate(['/dashboard/quans'])

    }
}
