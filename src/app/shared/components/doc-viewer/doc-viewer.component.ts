import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {

  isPdf: boolean = false;
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  constructor(private domSanitizer : DomSanitizer,public http:HttpClient,public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,) {
   // pdfDefaultOptions.assetsFolder = 'bleeding-edge';
   }
  public url;
  public docLoc;
  public pdfUrl;
  
  ngOnInit() {
    if(this.config.data.endsWith('pdf'))
    this.isPdf = true;
    else
    this.isPdf = false
    this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.config.data)
  }

}
