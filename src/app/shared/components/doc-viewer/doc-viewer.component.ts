import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {

  isPdf: boolean = false;
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  constructor(private domSanitizer : DomSanitizer,public http:HttpClient,public dialog:MatDialog,public dialogRef: MatDialogRef<DocViewerComponent>,@Inject(MAT_DIALOG_DATA) public dialogdata: any) {
   // pdfDefaultOptions.assetsFolder = 'bleeding-edge';
   }
  public url;
  public docLoc;
  public pdfUrl;
  
  ngOnInit() {
    if(this.dialogdata.endsWith('pdf'))
    this.isPdf = true;
    else
    this.isPdf = false
    this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.dialogdata)
  }

}
