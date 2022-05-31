import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NgxPrintModule} from 'ngx-print';

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
// services
import { NavService } from "./services/nav.service";
import { DialogService } from '../shared/services/dialog.service'
import { StudentService } from './services/student_services/student.service'
// Directives
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { MaterialModule } from './material.module'
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { ExcelService } from './services/excel.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PrimengModule } from './primeng.module'
import { NgxMaskModule } from 'ngx-mask';
import {WebcamModule} from 'ngx-webcam';
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
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    RouterModule,
    NgxPrintModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot(),
    WebcamModule
  ],
  exports: [
    LoaderComponent,
    ImageCropperModule,
    MaterialModule,
    FeatherIconsComponent,
    CommonModule,
    RouterModule,
    NgxPrintModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    WebcamModule,
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

