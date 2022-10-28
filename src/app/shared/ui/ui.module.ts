import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from 'src/app/core/helpers/loading.interceptor';
@NgModule({
  declarations: [PagetitleComponent,  LoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule
  ],
  exports: [PagetitleComponent, LoaderComponent],

  providers: [
    {
        provide : HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi   : true
    }
]
})
export class UIModule { }
