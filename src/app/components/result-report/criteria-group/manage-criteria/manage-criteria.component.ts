import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/shared/services/auth/api.service';

@Component({
  selector: 'app-manage-criteria',
  templateUrl: './manage-criteria.component.html',
  styleUrls: ['./manage-criteria.component.scss']
})
export class ManageCriteriaComponent implements OnInit {

  commonForm: FormGroup = new FormGroup({
    item_id: new FormControl(""),
    item_name: new FormControl("",[Validators.required]),
  });
  constructor(public config: DynamicDialogConfig, public apiService: ApiService, public toster:ToastrService,public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    if(this.config.data.operation != "insert"){
      // console.log(this.config.data);
      var data = this.config.data.data;
      this.commonForm.patchValue({
        item_id:data.result_criteria_group_id,
        item_name:data.result_criteria_group_name,
      })
    }
  }

  submit(){
    // console.log(this.commonForm.value);
      this.apiService.postTypeRequest(`${this.config.data.url}RESULT_CRITERIA_GROUP`, this.commonForm.value).subscribe((result: any) => {
        if (result.result) {
          this.toster.success(result.message);
          this.ref.close(true);
        } else {
          this.toster.error(result.message);
          this.ref.close(false);
        }
      });
  }

}
