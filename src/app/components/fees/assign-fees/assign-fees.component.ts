import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Toast, ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { ConfirmationService } from "src/app/shared/services/confirmation_service/confirmation.service";
import { profileListDetails } from "../../student/all-students/all-students.component";
import { FeeService } from "../Service/fee.service";

@Component({
  selector: "app-assign-fees",
  templateUrl: "./assign-fees.component.html",
  styleUrls: ["./assign-fees.component.scss"],
})
export class AssignFeesComponent implements OnInit {
  loader: boolean = false;
  public isFilter: boolean = true;
  StudentList: any = [];
  Students: any = [];
  selectedStudents: any = [];
  temp: any = [];
  rows: any = [];
  feeComponent: any;
  feeComponents: any = [];
  CompList: any = [];
  feeGroups: any = [];
  feeComponentList: any = [];
  feeNotes: string = "";
  due_date: string = "";
  departmentList: any = [];
  classList: any = [];
  dataFetch: boolean = false;
  filterValue: string = "";
  filterGroupValue: string = "";
  filterForm: FormGroup = new FormGroup({
    academicYear: new FormControl(""),
    department: new FormControl(""),
    class: new FormControl(""),
    studentName: new FormControl(""),
  });
  profileList: profileListDetails;
  constructor(public apiService: ApiService, public feeService: FeeService, public router: Router, public toster: ToastrService, public confirmationService: ConfirmationService) {
    this.isRowSelectable = this.isRowSelectable.bind(this);
  }

  ngOnInit(): void {
    this.loader = false;
    this.dataFetch = true;
    this.apiService.getTypeRequest("table_data/FEE_GROUP").subscribe((result: any) => {
      if (result.result) {
        this.dataFetch = false;
        this.feeGroups = this.CompList = [];
        this.feeGroups = this.CompList = result.data;
      } else {
      }
    });

    this.apiService.getTypeRequest("dropdown_data/DEPARTMENT").subscribe((result: any) => {
      if (result.result) {
        this.departmentList = [];
        this.departmentList = result.data;
      } else {
      }
    });
    this.apiService.getTypeRequest("dropdown_data/CLASS").subscribe((result: any) => {
      if (result.result) {
        this.classList = [];
        this.classList = result.data;
      } else {
      }
    });
    this.apiService.getTypeRequest("all_student_for_fee").subscribe((result: any) => {
      if (result.result) {
        this.StudentList = [];
        this.Students = [];
        this.dataFetch = false;
        result.data.forEach((data) => {
          this.Students.push(data);
        });
        this.StudentList = this.Students;
      } else {
      }
    });
  }

  assignFees(data) {
    this.feeComponent = data;
    this.dataFetch = true;
    this.apiService.getTypeRequest(`fee_component/by_group/${data.id}`).subscribe((result: any) => {
      if (result.result) {
        this.dataFetch = false;
        this.feeComponents = result.data;
        this.feeComponentList = [];
        result.data.forEach((element) => {
          const feecomp = {
            component_name: element.component_name,
            fee_component_id: element.fee_component_id,
            discount: 0,
            applicable_fees: element.fees,
            actual_fees: element.fees,
          };
          this.feeComponentList.push(feecomp);
          this.ngOnInit();
        });
      } else {
      }
    });
  }

  onFilterData(value) {
    this.StudentList = [];
    this.Students.filter((x) => {
      if (
        (this.filterForm.get("academicYear").value ? x.academic_year.includes(this.filterForm.get("academicYear").value) : true) &&
        (this.filterForm.get("department").value ? x.department.includes(this.filterForm.get("department").value) : true) &&
        (this.filterForm.get("class").value ? x.class.includes(this.filterForm.get("class").value) : true) &&
        (x.student_name.toLowerCase().includes(value.toLowerCase()) || x.admission_no.toString().includes(value))
      ) {
        this.StudentList.push(x);
      }
    });
  }

  reset() {
    this.filterForm.reset({
      academicYear: "",
      department: "",
      class: "",
      studentName: "",
    });
  }

  updateFees(data) {
    let applicable_fee = this.feeComponents.find((x) => x.fee_component_id == data.fee_component_id).fees;
    this.feeComponentList.find((x) => x.fee_component_id == data.fee_component_id).applicable_fees = applicable_fee - data.discount ?? 0;
  }

  updateFeeList() {
    this.feeComponentList.forEach((feeComponent) => {
      feeComponent.discount = feeComponent.discount > 0 ? feeComponent.discount : 0;
    });
  }

  assignFee() {
    this.loader = true;

    let studentIdList: any = [];
    let feeComponentList: any = [];
    this.selectedStudents.forEach((student) => {
      studentIdList.push(student.student_id);
    });
    if (studentIdList.length > 0) {
      this.feeComponentList.forEach((feeComponent) => {
        const fee = {
          fee_component_id: feeComponent.fee_component_id,
          discount: feeComponent.discount > 0 ? feeComponent.discount : 0,
          applicable_fees: feeComponent.applicable_fees,
        };
        feeComponentList.push(fee);
      });
      const feeDetails = {
        fee_group_id: this.feeComponent.id, //mandatory
        student_ids: studentIdList, //mandatory
        fee_component_data: feeComponentList,
        due_date: this.due_date,
        notes: this.feeNotes,
      };
      this.apiService.postTypeRequest("assign_fee/by_student", feeDetails).subscribe((result: any) => {
        if (result.result) {
          this.toster.success("Data Updated");
          this.confirmationService.showSuccessMessage("Added!", result.message);
          this.router.navigate(["/reports/dueFees"]);
        } else {
        }
      });
    } else {
    }
  }

  isRowSelectable(event: any) {
    return !this.isFeeAsigned(event.data);
  }

  isFeeAsigned(data: any) {
    let feeAvailable = false;
    for (const iterator of data.assigned_fee) {
      if (iterator.fee_group_id == this.feeComponent.id) {
        feeAvailable = true;
        break;
      }
    }
    return feeAvailable;
  }

  dateChange(event, field) {
    this.due_date = event.day + "-" + event.month + "-" + event.year;
  }

  onFilter(value) {
    this.CompList = [];
    if (this.filterGroupValue.length > 0) {
      this.feeGroups.filter((x) => {
        if (x.name == this.filterGroupValue) this.CompList.push(x);
      });
    } else {
      this.feeGroups.filter((x) => {
        if (x.name.toLowerCase().includes(value.toLowerCase())) this.CompList.push(x);
      });
    }
  }

  onClear() {
    this.CompList = this.feeGroups;
  }
}
