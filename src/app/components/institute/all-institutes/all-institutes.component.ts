import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { InstituteService } from 'src/app/shared/services/institute_services/institute.service'
@Component({
  selector: 'app-all-institutes',
  templateUrl: './all-institutes.component.html',
  styleUrls: ['./all-institutes.component.scss'], 
  providers: [NgbPaginationConfig]
})
export class AllInstitutesComponent implements OnInit {

  dataFetch: boolean = false;
  List:any[] = [];
  page = 1;
  pageSize = 12;
  constructor(public datepipe: DatePipe,public apiService:ApiService,private dialog: DialogService, public spinner:SpinnerService, public toster:ToastrService,public instituteService:InstituteService,public router:Router) {}
  

  ngOnInit() {
    this.dataFetch = true
    this.apiService.getTypeRequest('dropdown_data/ALL_INSTITUTIONS').subscribe((result:any) => {
      this.List = result.data
      this.dataFetch = false
    })
  }

  calculateDiff(startDate,endDate){
    let s = startDate.split("-");
    let e = endDate.split("-");
     return Math.floor((Date.UTC(e[2] , e[1], e[0]) - Date.UTC(s[2] , s[1], s[0]))/(1000 * 60 * 60 * 24));
   }

   viewDetails(item){
    this.instituteService.setSelectedInstitute(item);
    this.router.navigate(['/institute/instituteInfo'])
  }
}
