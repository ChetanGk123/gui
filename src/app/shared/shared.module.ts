import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DatePipe } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { LoaderComponent } from './components/loader/loader.component'
import { BankDetailsComponent } from './components/bank-details/bank-details.component'
import { AddEditBankDetailsComponent } from './components/bank-details/add-edit-bank-details/add-edit-bank-details.component'
import { ProfileDocumentsComponent } from './components/profile-documents/profile-documents.component'
import { AddEditProfileDocumentsComponent } from './components/profile-documents/add-edit-profile-documents/add-edit-profile-documents.component'
// services
import { NavService } from "./services/nav.service";
import { DialogService } from '../shared/services/dialog.service'
import { StudentService } from './services/student_services/student.service'
// Directives
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { ExcelService } from './services/excel.service';

import { PrimengModule } from './primeng.module'
import {WebcamModule} from 'ngx-webcam';
import { CameraComponent } from './components/camera/camera.component';
import { NgxPrintModule } from 'ngx-print';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BookmarkComponent,
    ContentLayoutComponent,
    FeatherIconsComponent,
    BreadcrumbComponent,
    ToggleFullscreenDirective,
    CustomizerComponent,
    DialogComponent,
    DocViewerComponent,
    CameraComponent,
    BankDetailsComponent,
    AddEditBankDetailsComponent,
    ProfileDocumentsComponent,
    AddEditProfileDocumentsComponent
  ],
  imports: [
     CommonModule,
     WebcamModule,
     MatDialogModule,
     MatIconModule,
     ImageCropperModule,
     RouterModule,
     PrimengModule,
     FormsModule,
     NgbModule,
     ReactiveFormsModule,
  ],
  exports: [
     FeatherIconsComponent,
     LoaderComponent,
     NgxPrintModule,
     PrimengModule,
     FormsModule,
     NgbModule,
     ReactiveFormsModule,
     CameraComponent,
     BankDetailsComponent,
     AddEditBankDetailsComponent,
     ProfileDocumentsComponent,
     AddEditProfileDocumentsComponent
  ],
  providers: [
    NavService,
    DatePipe,
    ExcelService,
    DialogService,
    StudentService,
    { provide: MatDialogRef, useValue: {} },
  ]
})
export class SharedModule { }

