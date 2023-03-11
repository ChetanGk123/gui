"use strict";(self.webpackChunkendless_starterkit=self.webpackChunkendless_starterkit||[]).push([[592],{18634:(Z,_,a)=>{a.d(_,{u:()=>P});var t=a(93075),u=a(72308),o=a(5e3),m=a(64383),s=a(21242),d=a(69808),l=a(15091);function c(r,i){if(1&r&&(o.TgZ(0,"option",34),o._uU(1),o.qZA()),2&r){const e=i.$implicit;o.s9C("value",e.account_id),o.xp6(1),o.Oqu(e.account_name)}}function p(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1,"Source Account is required."),o.qZA())}function g(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1," Destination Account should be different from Source. "),o.qZA())}function T(r,i){if(1&r&&(o.TgZ(0,"div"),o.TgZ(1,"label",32),o._uU(2,"Source Account "),o.TgZ(3,"span",9),o._uU(4,"*"),o.qZA(),o.qZA(),o.TgZ(5,"select",33),o.TgZ(6,"option",11),o._uU(7,"Select A/c Head"),o.qZA(),o.YNc(8,c,2,2,"option",12),o.qZA(),o.YNc(9,p,2,0,"div",13),o.YNc(10,g,2,0,"div",13),o.qZA()),2&r){const e=o.oxw();o.xp6(8),o.Q6J("ngForOf",e.sourceList),o.xp6(1),o.Q6J("ngIf",e.transactionForm.controls.source_id.touched&&(null==e.transactionForm.controls.source_id.errors?null:e.transactionForm.controls.source_id.errors.required)),o.xp6(1),o.Q6J("ngIf",e.transactionForm.controls.destination_id.touched&&e.transactionForm.controls.destination_id.value==e.transactionForm.controls.source_id.value&&e.transactionForm.controls.source_id.value.toString().length>0)}}function A(r,i){if(1&r&&(o.TgZ(0,"option",34),o._uU(1),o.qZA()),2&r){const e=i.$implicit;o.s9C("value",e.account_id),o.xp6(1),o.Oqu(e.account_name)}}function v(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1,"Destination Account is required."),o.qZA())}function q(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1," Destination Account should be different from Source. "),o.qZA())}function h(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1,"Amount is required."),o.qZA())}function U(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1,"Transaction Date is required."),o.qZA())}function C(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1,"Transaction Mode is required."),o.qZA())}function F(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1,"Transaction Ref is required."),o.qZA())}function b(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1,"Paid By is required."),o.qZA())}function I(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1,"Paid To is required."),o.qZA())}function y(r,i){1&r&&(o.TgZ(0,"div",35),o._uU(1,"Comments required."),o.qZA())}function N(r,i){1&r&&o._UZ(0,"i",36)}let P=(()=>{class r{constructor(e,n,f,D,E){this.toster=e,this.apiService=n,this.dialog=f,this.dialogRef=D,this.dialogdata=E,this.transactionForm=new t.cw({source_id:new t.NI("",[t.kI.required]),destination_id:new t.NI("",[t.kI.required]),transaction_amount:new t.NI("",[t.kI.required]),payment_mode:new t.NI("",[t.kI.required]),payment_ref:new t.NI("",[t.kI.required]),user_comments:new t.NI("",[t.kI.required]),paid_by:new t.NI("",[t.kI.required]),paid_to:new t.NI("",[t.kI.required]),txn_date:new t.NI("",[t.kI.required])})}ngOnInit(){var e;this.clicked=!1,this.sourceList=null===(e=this.dialogdata)||void 0===e?void 0:e.sourceList,this.destinationList=this.dialogdata.destinationList,this.dialogdata.disableSource&&(this.transactionForm.controls.source_id.clearValidators(),this.transactionForm.controls.destination_id.patchValue(this.dialogdata.destinationList[0].account_id))}OnSubmit(){this.transactionForm.controls.destination_id.value.toString().length>0&&this.transactionForm.controls.destination_id.value==this.transactionForm.controls.source_id.value&&(this.transactionForm.controls.source_id.markAsDirty(),this.transactionForm.controls.destination_id.markAsDirty(),this.toster.error("Source A/c and Destination A/c cannot be same.","Invalid Missing")),this.transactionForm.valid?(this.clicked=!0,this.apiService.postTypeRequest(`account_head_txn/ACC_HEAD_${this.dialogdata.url}`,this.transactionForm.value).toPromise().then(e=>{e.result?(this.toster.success(e.message),this.dialogRef.close(!0)):this.clicked=!1})):(this.toster.error("Enter all required details","Details Missing"),this.transactionForm.markAllAsTouched())}}return r.\u0275fac=function(e){return new(e||r)(o.Y36(m._W),o.Y36(s.s),o.Y36(u.uw),o.Y36(u.so),o.Y36(u.WI))},r.\u0275cmp=o.Xpm({type:r,selectors:[["app-account-transfer"]],decls:73,vars:17,consts:[[1,"debit-card"],[1,"card","height-equal"],[1,"card-header"],[1,"card-body"],[1,"row",3,"formGroup"],[1,"form-group","col-sm-12","col-md-6","col-md-6"],[4,"ngIf"],[1,"form-group","col-sm-12","col-md-6"],["for","account_id"],[1,"font-danger"],["formControlName","destination_id","id","account_id","size","1",1,"form-control"],["value",""],[3,"value",4,"ngFor","ngForOf"],["class","text text-danger",4,"ngIf"],["for","transaction_amount"],["type","text","mask","separator.2","thousandSeparator",",","formControlName","transaction_amount","id","transaction_amount","placeholder","1,000",1,"form-control"],["for","txn_date"],["type","date","id","txn_date","placeholder","txn_date","formControlName","txn_date",1,"form-control"],["for","payment_mode"],["type","text","formControlName","payment_mode","id","payment_mode","placeholder","PhonePe",1,"form-control"],["for","payment_ref"],["type","text","formControlName","payment_ref","id","payment_ref","placeholder","UTR132156",1,"form-control"],["for","paid_by"],["type","text","formControlName","paid_by","id","paid_by","placeholder","User",1,"form-control"],["for","paid_to"],["type","text","formControlName","paid_to","id","paid_to","placeholder","User",1,"form-control"],[1,"form-group","col-12","p-r-0"],["for","user_comments"],["id","user_comments","rows","2","cols","5","placeholder","Description...",1,"form-control",3,"formControl"],[1,"col-12"],["type","button",1,"btn","btn-primary-gradien","btn-block",3,"disabled","click"],["class","fa fa-circle-o-notch fa-spin",4,"ngIf"],["for","source_id"],["formControlName","source_id","id","source_id","size","1",1,"form-control"],[3,"value"],[1,"text","text-danger"],[1,"fa","fa-circle-o-notch","fa-spin"]],template:function(e,n){1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o.TgZ(2,"div",2),o.TgZ(3,"h5"),o._uU(4),o.qZA(),o.qZA(),o.TgZ(5,"div",3),o.TgZ(6,"form",4),o.TgZ(7,"div",5),o.YNc(8,T,11,3,"div",6),o.qZA(),o.TgZ(9,"div",7),o.TgZ(10,"label",8),o._uU(11,"Destination Account "),o.TgZ(12,"span",9),o._uU(13,"*"),o.qZA(),o.qZA(),o.TgZ(14,"select",10),o.TgZ(15,"option",11),o._uU(16,"Select A/c Head"),o.qZA(),o.YNc(17,A,2,2,"option",12),o.qZA(),o.YNc(18,v,2,0,"div",13),o.YNc(19,q,2,0,"div",13),o.qZA(),o.TgZ(20,"div",7),o.TgZ(21,"label",14),o._uU(22,"Amount "),o.TgZ(23,"span",9),o._uU(24,"*"),o.qZA(),o.qZA(),o._UZ(25,"input",15),o.YNc(26,h,2,0,"div",13),o.qZA(),o.TgZ(27,"div",7),o.TgZ(28,"label",16),o._uU(29,"Transaction Date "),o.TgZ(30,"span",9),o._uU(31,"*"),o.qZA(),o.qZA(),o._UZ(32,"input",17),o.YNc(33,U,2,0,"div",13),o.qZA(),o.TgZ(34,"div",7),o.TgZ(35,"label",18),o._uU(36,"Transaction Mode "),o.TgZ(37,"span",9),o._uU(38,"*"),o.qZA(),o.qZA(),o._UZ(39,"input",19),o.YNc(40,C,2,0,"div",13),o.qZA(),o.TgZ(41,"div",7),o.TgZ(42,"label",20),o._uU(43,"Transaction Ref No "),o.TgZ(44,"span",9),o._uU(45,"*"),o.qZA(),o.qZA(),o._UZ(46,"input",21),o.YNc(47,F,2,0,"div",13),o.qZA(),o.TgZ(48,"div",7),o.TgZ(49,"label",22),o._uU(50,"Paid By "),o.TgZ(51,"span",9),o._uU(52,"*"),o.qZA(),o.qZA(),o._UZ(53,"input",23),o.YNc(54,b,2,0,"div",13),o.qZA(),o.TgZ(55,"div",7),o.TgZ(56,"label",24),o._uU(57,"Paid To "),o.TgZ(58,"span",9),o._uU(59,"*"),o.qZA(),o.qZA(),o._UZ(60,"input",25),o.YNc(61,I,2,0,"div",13),o.qZA(),o.TgZ(62,"div",26),o.TgZ(63,"label",27),o._uU(64,"Transaction Description "),o.TgZ(65,"span",9),o._uU(66,"*"),o.qZA(),o.qZA(),o._UZ(67,"textarea",28),o.YNc(68,y,2,0,"div",13),o.qZA(),o.TgZ(69,"div",29),o.TgZ(70,"button",30),o.NdJ("click",function(){return n.OnSubmit()}),o._uU(71),o.YNc(72,N,1,0,"i",31),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&e&&(o.xp6(4),o.Oqu(n.dialogdata.title),o.xp6(2),o.Q6J("formGroup",n.transactionForm),o.xp6(2),o.Q6J("ngIf",!n.dialogdata.disableSource),o.xp6(9),o.Q6J("ngForOf",n.destinationList),o.xp6(1),o.Q6J("ngIf",n.transactionForm.controls.destination_id.touched&&(null==n.transactionForm.controls.destination_id.errors?null:n.transactionForm.controls.destination_id.errors.required)),o.xp6(1),o.Q6J("ngIf",n.transactionForm.controls.destination_id.touched&&n.transactionForm.controls.destination_id.value==n.transactionForm.controls.source_id.value&&n.transactionForm.controls.source_id.value.toString().length>0),o.xp6(7),o.Q6J("ngIf",n.transactionForm.controls.transaction_amount.touched&&(null==n.transactionForm.controls.transaction_amount.errors?null:n.transactionForm.controls.transaction_amount.errors.required)),o.xp6(7),o.Q6J("ngIf",n.transactionForm.controls.txn_date.touched&&(null==n.transactionForm.controls.txn_date.errors?null:n.transactionForm.controls.txn_date.errors.required)),o.xp6(7),o.Q6J("ngIf",n.transactionForm.controls.payment_mode.touched&&(null==n.transactionForm.controls.payment_mode.errors?null:n.transactionForm.controls.payment_mode.errors.required)),o.xp6(7),o.Q6J("ngIf",n.transactionForm.controls.payment_ref.touched&&(null==n.transactionForm.controls.payment_ref.errors?null:n.transactionForm.controls.payment_ref.errors.required)),o.xp6(7),o.Q6J("ngIf",n.transactionForm.controls.paid_by.touched&&(null==n.transactionForm.controls.paid_by.errors?null:n.transactionForm.controls.paid_by.errors.required)),o.xp6(7),o.Q6J("ngIf",n.transactionForm.controls.paid_to.touched&&(null==n.transactionForm.controls.paid_to.errors?null:n.transactionForm.controls.paid_to.errors.required)),o.xp6(6),o.Q6J("formControl",n.transactionForm.controls.user_comments),o.xp6(1),o.Q6J("ngIf",n.transactionForm.controls.user_comments.touched&&(null==n.transactionForm.controls.user_comments.errors?null:n.transactionForm.controls.user_comments.errors.required)),o.xp6(2),o.Q6J("disabled",n.clicked),o.xp6(1),o.hij("",n.clicked?"":"Submit"," "),o.xp6(1),o.Q6J("ngIf",n.clicked))},directives:[t._Y,t.JL,t.sg,d.O5,t.EJ,t.JJ,t.u,t.YN,t.Kr,d.sg,l.hx,t.Fj,t.oH],styles:[""]}),r})()},65484:(Z,_,a)=>{a.d(_,{M:()=>m});var t=a(5e3),u=a(69808);function o(s,d){1&s&&t._UZ(0,"i",17)}let m=(()=>{class s{constructor(){this.Loader=!1}ngOnInit(){}changePassword(){this.Loader=!0}cancel(){this.Loader=!1}}return s.\u0275fac=function(l){return new(l||s)},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-reset-pwd"]],decls:24,vars:3,consts:[[1,"container-fluid"],[1,"authentication-main"],[1,"row"],[1,"col-md-12","p-0"],[1,"auth-innerright",2,"min-height","53vh"],[1,"authentication-box"],[1,"text-center","mt-4"],["src","assets/images/logo.png","height","70px","alt","logo"],[1,"card","mt-4","p-4","mb-5"],[1,"theme-form"],[1,"form-group"],[1,"col-form-label"],["type","password","placeholder","*******",1,"form-control"],[1,"form-group","form-row","mb-2","justify-content-center"],["type","submit",1,"btn","btn-primary","mr-5",3,"disabled","click"],["class","fa fa-circle-o-notch fa-spin",4,"ngIf"],["type","submit",1,"btn","btn-primary","ml-5",3,"disabled","click"],[1,"fa","fa-circle-o-notch","fa-spin"]],template:function(l,c){1&l&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"div",4),t.TgZ(5,"div",5),t.TgZ(6,"div",6),t._UZ(7,"img",7),t.qZA(),t.TgZ(8,"div",8),t.TgZ(9,"form",9),t.TgZ(10,"div",10),t.TgZ(11,"label",11),t._uU(12,"Enter New Password"),t.qZA(),t._UZ(13,"input",12),t.qZA(),t.TgZ(14,"div",10),t.TgZ(15,"label",11),t._uU(16,"Confirm Password"),t.qZA(),t._UZ(17,"input",12),t.qZA(),t.TgZ(18,"div",13),t.TgZ(19,"button",14),t.NdJ("click",function(){return c.changePassword()}),t._uU(20,"Change\xa0"),t.YNc(21,o,1,0,"i",15),t.qZA(),t.TgZ(22,"button",16),t.NdJ("click",function(){return c.cancel()}),t._uU(23,"Cancel"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&l&&(t.xp6(19),t.Q6J("disabled",c.Loader),t.xp6(2),t.Q6J("ngIf",c.Loader),t.xp6(1),t.Q6J("disabled",c.Loader))},directives:[u.O5],styles:[""]}),s})()}}]);