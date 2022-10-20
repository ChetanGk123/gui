import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoreConfigService } from 'src/app/core/services/config.service';


@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

   // Public
   public coreConfig: any;
   public error: any;
   public passwordTextType: boolean;
   public confPasswordTextType: boolean;
   public resetForm: FormGroup;
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
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

   // convenience getter for easy access to form fields
   get f() {
     return this.resetForm.controls;
   }

   /**
    * Toggle password
    */
   togglePasswordTextType() {
     this.passwordTextType = !this.passwordTextType;
   }

   /**
    * Toggle confirm password
    */
   toggleConfPasswordTextType() {
     this.confPasswordTextType = !this.confPasswordTextType;
   }

   /**
    * On Submit
    */
   onSubmit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.resetForm.invalid) {
       return;
     }
   }

   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit(): void {
     this.resetForm = this._formBuilder.group({
       newPassword: ['', [Validators.required]],
       confirmPassword: ['', [Validators.required]]
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
