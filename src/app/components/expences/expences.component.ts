import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { AccountTransferComponent } from "../accounts/account-transfer/account-transfer.component";

@Component({
  selector: "app-expences",
  templateUrl: "./expences.component.html",
  styleUrls: ["./expences.component.scss"],
})
export class ExpencesComponent implements OnInit {
  dataFetch: boolean;
  productDialog: boolean;
  sourceList: any[];
  destinationList: any[];
  expenseList: any[];
  selectedData: any;
  constructor(public dialog: MatDialog, public apiService: ApiService, public toster: ToastrService) {}

  ngOnInit(): void {
    this.dataFetch = true;
    this.apiService.getTypeRequest("table_data/ACCOUNT_HEAD").subscribe((result: any) => {
      if (result.result) {
        this.sourceList = result.data;
      }
      this.dataFetch = false;
    });
    this.dataFetch = true;
    this.apiService.getTypeRequest("new_table_data/EXPENSE_ACCOUNT_HEAD").subscribe((result: any) => {
      if (result.result) {
        this.destinationList = result.data;
      }
      this.dataFetch = false;
    });
    this.dataFetch = true;
    this.apiService.getTypeRequest("new_table_data/EXPENSE_ACCOUNT_HEAD_TRANSACTIONS").subscribe((result: any) => {
      if (result.result) {
        this.expenseList = result.data;
      }
      this.dataFetch = false;
    });
  }

  openDialog(data) {
    this.productDialog = true;
    this.selectedData = data;
    console.log(this.selectedData);
  }

  AddExpences() {
    const dialogRef = this.dialog.open(AccountTransferComponent, {
      backdropClass: "blurred",
      height: "80vH",
      panelClass: ["xl-40", "sm-80", "md-50"],
      data: {
        title: "EXPENSE",
        url: "EXPENSE",
        sourceList: this.sourceList,
        destinationList: this.destinationList,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
}
