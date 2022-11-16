import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MiscComponent } from "./misc.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { CommonComponent } from './common/common.component';

const routes: Routes = [{ path: "", component: MiscComponent }];

@NgModule({
  declarations: [MiscComponent, CommonComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DynamicDialogModule, FormsModule, HttpClientModule],
  providers:[DialogService]
})
export class MiscModule {}
