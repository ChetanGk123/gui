import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import * as FileSaver from "file-saver";
import { MatDialog } from "@angular/material/dialog";
import { AccountHeadTransactionsComponent } from "./account-head-transactions/account-head-transactions.component";
@Component({
  selector: "app-account-heads",
  templateUrl: "./account-heads.component.html",
  styleUrls: ["./account-heads.component.scss"],
})
export class AccountHeadsComponent implements OnInit {
  from_date;
  to_date;
  filterValue: any = "";
  public dataFetch: boolean = false;
  public productDialog: boolean;
  TransactionsList: any = [];
  tempTransactionsList: any = [];
  AccountHeadList: any = [];
  exportColumns: any[];
  selectedData: any;
  //to_date: NgbDateStruct = { year: 1789, month: 7, day: 14 };
  public isFilter: boolean = true;
  form: FormGroup = new FormGroup({
    account_id: new FormControl("", [Validators.required]),
    start_date: new FormControl(""),
    end_date: new FormControl(""),
  });
  constructor(
    public apiService: ApiService, 
    public toastr: ToastrService,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.apiService
      .getTypeRequest("table_data/ACCOUNT_HEAD")
      .subscribe((result: any) => {
        this.AccountHeadList = result.data;
      });
  }

  fetchData() {
    this.dataFetch = true;
    if (this.form.get("account_id").value.length > 0) {
      this.apiService
        .postTypeRequest("transactions/ACCOUNT_HEAD", this.form.value)
        .subscribe((result: any) => {
          if (result.result) {
            this.dataFetch = false;
            this.TransactionsList = result.data.transactions;
            this.tempTransactionsList = result.data.transactions;
            this.exportColumns = this.TransactionsList.map((col) => ({
              title: "Receipt No",
              dataKey: col.receipt_no,
            }));
          }
        });
    } else {
      this.toastr.error("Select Required Data");
    }
  }

  onFilter() {
    this.TransactionsList = [];
    this.tempTransactionsList.forEach((element) => {
      if (element.transaction_type.includes(this.filterValue))
        this.TransactionsList.push(element);
    });
  }

  clearData() {
    this.from_date = "";
    this.to_date = "";
    this.TransactionsList = [];
    this.form.reset({
      account_id: "",
      start_date: "",
      end_date: "",
    });
  }

  openDialog(data) {
    this.productDialog = true;
    this.selectedData = data;
  }

  dateChange(event, field) {
    if (this.form.get("account_id").value.length > 0) {
      this.form
        .get(field)
        .setValue(event.day + "-" + event.month + "-" + event.year);
    } else {
      this.toastr.error("Select Required Data");
    }
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.TransactionsList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "TransactionsList");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  exportPdf(){
    const name = this.AccountHeadList.find((p)=>{
      if(p.account_id == this.form.get("account_id").value)
      return p.account_name
    })
    
    const dialogRef = this.dialog.open(AccountHeadTransactionsComponent, {
      data: {
        accountHead:name.account_name,
        start_date:this.form.get("start_date").value,
        end_date:this.form.get("end_date").value,
        transactions:this.TransactionsList
      },
      height: "88%",
      width: "80%",
    });
  }
}
