import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../../shared/services/auth/api.service";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { map } from "rxjs/operators";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { DocComponent } from "../../../misc/doc/doc.component";
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { DocViewerComponent } from "../../../../shared/components/doc-viewer/doc-viewer.component";
import { AuthService } from "../../../../shared/services/auth/auth.service";
import { EmployeeService } from "src/app/shared/services/employee/employee.service";

declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
})
export class DocumentsComponent implements OnInit {
  employee_documents: any = [];
  DocumentList = [];
  update: boolean = false;
  showDoc: boolean = false;
  loader: boolean = false;
  dataFetch: boolean = false;
  employee: any = this.employeeService.getSelectedEmployee;
  DocUrl: string = "";
  file?: File;
  file_data: FormData;
  fileGroup: FormGroup = new FormGroup({
    employee_id: new FormControl(this.employee?.employee_id),
    doc_id: new FormControl("", [Validators.required]),
    doc_no: new FormControl("", [Validators.required]),
    doc_url: new FormControl(""),
    issue_date: new FormControl(""),
    expiry_date: new FormControl(""),
    doc: new FormControl(""),
    doc_loc: new FormControl(""),
    act_doc_id: new FormControl(""),
  });
  form: FormGroup = new FormGroup({
    file: new FormControl(""),
  });
  constructor(
    public http: HttpClient,
    public employeeService: EmployeeService,
    public dialog: MatDialog,
    public toster: ToastrService,
    public apiService: ApiService,
    public authService: AuthService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loader = false;
    this.update = false;
    this.fetchApi();
  }

  async fetchApi() {
    this.dataFetch = false;
    this.apiService
      .getTypeRequest("dropdown_data/DOCUMENT")
      .subscribe((result: any) => {
        this.DocumentList = result.data;
      });
    await this.apiService
      .getTypeRequest("employee_profile/" + this.employee?.employee_id)
      .subscribe((result: any) => {
        if (result.result) {
          this.employee_documents = result.data.employee_docments;
        } else {
          if (result.error_code === "INVALID_LOGIN") {
            this.toster.error("Session Expired");
            this.authService.SignOut();
          }
        }
        this.dataFetch = true;
      });
  }

  resetFileGroup() {
    this.file = null
    this.fileGroup.reset({
      employee_id: this.employee?.employee_id,
      doc_id: "",
      doc_no: "",
      doc_url: "",
      issue_date: "",
      expiry_date: "",
      doc: "",
      doc_loc: "",
      act_doc_id: "",
    });
    this.update = false;
    this.showDoc = false;
  }

  docTypeChange() {
    var id = this.fileGroup.get("doc_id").value;
  }

  readUrl(event: any) {
    this.file = event.target.files[0];
    this.form.get("file").setValue(this.file);
  }

  deleteDocument() {
    this.fileGroup.patchValue({
      doc_url: "",
    });
    this.form.reset({
      employee_id: this.employee?.employee_id,
    });
    this.fileGroup.updateValueAndValidity();
    this.updateDocument(this.fileGroup.value);
  }

  deleteRecord(data) {
    var Request_Data = {
      document_id: data.actual_doc_id,
    };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure, you want to delete?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.apiService
            .postTypeRequest("delete_document", Request_Data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data deleted");
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  result.message,
                  "success"
                );
                this.ngOnInit();
              } else {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  result.message,
                  "error"
                );
                this.toster.error(result.message);
              }
            });
        }
      });
  }

  async uploadFile() {
    this.loader = true
    if (this.file) {
      const formData: FormData = new FormData();
      formData.append("file", this.form.get("file").value);
      formData.append("token", this.apiService.getTocken);
      this.file_data = formData;

      var loc;
      await this.apiService
        .postFileTypeRequest("upload_employee_doc", formData)
        .toPromise()
        .then((result: any) => {
          if(result.result){
            loc = result.data?.file_loc ?? "";
            this.fileGroup.patchValue({
              doc_loc: loc,
            });
          }else{
            this.toster.error(result.message)
          }
        })
    }
    this.fileGroup.updateValueAndValidity();
    if (this.update) {
      this.updateFile();
    } else {
      this.saveFile();
    }
  }

  async saveFile() {
    this.loader = true;
    await this.apiService
      .postTypeRequest("save_document_data/EMPLOYEE", this.fileGroup.value)
      .subscribe(async (result: any) => {
        if (result.result) {
          this.toster.success("Data added successfully");
          this.ngOnInit();
        } else {
          this.toster.error(result.message);
          this.loader = false;
        }
      });
    this.resetFileGroup();
  }

  async updateFile() {
    this.loader = true;

    await this.apiService
      .postTypeRequest("update_document_date/EMPLOYEE", this.fileGroup.value)
      .subscribe(async (result: any) => {
        if (result.result) {
          this.toster.success("Data added successfully");
          this.ngOnInit();
          this.update = false;
        } else {
          this.toster.error(result.message);
          this.loader = false;
        }
      });
    this.resetFileGroup();
  }

  addDocumentType() {
    const dialogRef = this.dialog.open(DocComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService
          .getTypeRequest("dropdown_data/DOCUMENT")
          .subscribe((result: any) => {
            this.DocumentList = result.data;
          });
        this.DocumentList = this.DocumentList.filter((x) => {
          !this.employee_documents.includes((y) => {
            y.id == x.id;
          });
        });
      }
    });
  }

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: "blob" }).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  updateDocument(data) {
    this.update = true;
    this.DocUrl = data.doc_url;
    this.showDoc = true;
    let i = data.issued_date ? data.issued_date.split("-") : "";
    let e = data.expiry_date ? data.expiry_date.split("-") : "";
    this.fileGroup.patchValue({
      doc_name: data.doc_id,
      doc_id: data.doc_list_id ?? data.doc_id,
      doc_url: data.doc_url,
      doc_no: data.doc_no ?? data.document_no ?? "",

      issue_date: data.issued_date
        ? this.datepipe.transform(
            new Date(i[2] + "/" + i[1] + "/" + i[0]),
            "yyyy-MM-dd"
          )
        : "",
      expiry_date: data.expiry_date
        ? this.datepipe.transform(
            new Date(e[2] + "/" + e[1] + "/" + e[0]),
            "yyyy-MM-dd"
          )
        : "",
      act_doc_id: data.act_doc_id ?? data.actual_doc_id ?? "",
    });
    this.fileGroup.updateValueAndValidity();
    // console.log(this.fileGroup);
  }

  downloadDocument(data) {
    const dialogRef = this.dialog.open(DocViewerComponent, {
      data: data.doc_url,
      width: "60%",
      height: "90%",
    });
  }
}
