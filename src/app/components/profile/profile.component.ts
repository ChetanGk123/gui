import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";

import { ForgetPwdComponent } from "../authentication/forget-pwd/forget-pwd.component";
import { ResetPwdComponent } from "../authentication/reset-pwd/reset-pwd.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  card: string = "Personal Information";
  constructor(public ref: DialogService) {}

  ngOnInit(): void {}

  setCard(cardName) {
    this.card = cardName;
  }

  ChangePassword() {
    const dialogRef = this.ref.open(ResetPwdComponent, {});
  }
}
