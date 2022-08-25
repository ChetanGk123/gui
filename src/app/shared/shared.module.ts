import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { DatePipe } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ContentLayoutComponent } from "./components/layout/content-layout/content-layout.component";
import { FeatherIconsComponent } from "./components/feather-icons/feather-icons.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { CustomizerComponent } from "./components/customizer/customizer.component";
import { BookmarkComponent } from "./components/bookmark/bookmark.component";
import { LoaderComponent } from "./components/loader/loader.component";
// services
import { NavService } from "./services/nav.service";
// Directives
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ExcelService } from "./services/excel.service";

import { PrimengModule } from "./primeng.module";
import { WebcamModule } from "ngx-webcam";
import { CameraComponent } from "./components/camera/camera.component";
import { NgxPrintModule } from "ngx-print";
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  declarations: [LoaderComponent, HeaderComponent, FooterComponent, SidebarComponent, BookmarkComponent, ContentLayoutComponent, FeatherIconsComponent, BreadcrumbComponent, ToggleFullscreenDirective, CustomizerComponent, CameraComponent],
  imports: [CommonModule, WebcamModule, ImageCropperModule, RouterModule, PrimengModule, FormsModule, NgbModule, ReactiveFormsModule],
  exports: [FeatherIconsComponent, LoaderComponent, NgxPrintModule, PrimengModule, FormsModule, NgbModule, ReactiveFormsModule, CameraComponent],
  providers: [NavService, DatePipe, ExcelService],
})
export class SharedModule {}
