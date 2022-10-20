import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoreConfigService } from 'src/app/core/services/config.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

   // Public
   public coreConfig: any;
   public error: any;
   public passwordTextType: boolean;
   public successmsg: boolean;
   public signupForm: FormGroup;
   public submitted = false;

   // Private
   private _unsubscribeAll: Subject<any>;

   /**
    * Constructor
    *
    * @param {CoreConfigService} _coreConfigService
    * @param {FormBuilder} _formBuilder
    */
   constructor(private _coreConfigService: CoreConfigService, private _formBuilder: FormBuilder) {
     this._unsubscribeAll = new Subject();

     // Configure the layout
     this._coreConfigService.config = {
       layout: {
         navbar: {
           hidden: true
         },
         menu: {
           hidden: true
         },
         footer: {
           hidden: true
         },
         customizer: false,
         enableLocalStorage: false
       }
     };
   }

   // convenience getter for easy access to form fields
   get f() {
     return this.signupForm.controls;
   }

   /**
    * Toggle password
    */
   togglePasswordTextType() {
     this.passwordTextType = !this.passwordTextType;
   }

   /**
    * On Submit
    */
   onSubmit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.signupForm.invalid) {
       return;
     }
   }

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit(): void {
     this.signupForm = this._formBuilder.group({
       username: ['', [Validators.required]],
       email: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required]
     });

     // Subscribe to config changes
     this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
       this.coreConfig = config;
     });
   }

   /**
    * On destroy
    */
   ngOnDestroy(): void {
     // Unsubscribe from all subscriptions
     this._unsubscribeAll.next();
     this._unsubscribeAll.complete();
   }
 }
