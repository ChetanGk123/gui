import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-map-new-subject",
  templateUrl: "./map-new-subject.component.html",
  styleUrls: ["./map-new-subject.component.scss"],
})
export class MapNewSubjectComponent implements OnInit {
  public isFilter: boolean = true;
  selectedSubjects= [];
  form: FormGroup = new FormGroup({
    subject_allocation_id: new FormControl(""),
    academic_id: new FormControl("",[Validators.required]),
    department_id: new FormControl("",[Validators.required]),
    class_id: new FormControl("",[Validators.required]),
    division_id: new FormControl("",[Validators.required]),
    subject_ids: new FormControl([]),
    subject_id: new FormControl([]),
  });
  constructor(public config: DynamicDialogConfig, public apiService: ApiService, public toster:ToastrService,public ref: DynamicDialogRef,) {}

  ngOnInit(): void {
    for (const key of this.config.data.academinYearList) {
      if(key.status == 1){
        this.form.controls.academic_id.setValue(key.id);
        break
      }
    }
    
    if(this.config.data.operation != "insert"){
      var data = this.config.data.updateDeleteData;
      
      for (const iterator of this.config.data.subjectList) {
        if(iterator.id == data.subject_id){
          this.selectedSubjects.push(iterator)
          break
        }
      }
      this.form.patchValue({
        subject_allocation_id:data.subject_allocation_id,
        academic_id:data.academic_id,
        department_id:data.department_id,
        class_id:data.class_id,
        division_id:data.division_id,
        subject_ids:data.subject_ids,
        subject_id:data.subject_id,
      })
    }
  }

  submit() {
    var data = []
    for (const key of this.selectedSubjects) {
      data.push(key.id)
    }
    if(this.config.data.operation == "insert"){
      this.form.controls.subject_ids.setValue(data);
    } else{
      this.form.controls.subject_id.setValue(this.config.data.updateDeleteData.subject_id);
      this.form.controls.subject_ids.setValue([]);
    }
      console.log(this.form.value);
      this.apiService.postTypeRequest(`subject_allocation_ops/${this.config.data.operation}`, this.form.value).subscribe((result: any) => {
        if (result.result) {
          this.toster.success(result.message);
          this.ref.close(true);
        } else {
          this.toster.error(result.message);
          this.ref.close(false);
        }
      });
  }

  cancel(){
    this.ref.close(false);
  }
}
