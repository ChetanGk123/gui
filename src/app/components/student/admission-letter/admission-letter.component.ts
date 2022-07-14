import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { admission_data, current_academic_details, personal_data, parent_data } from 'src/app/shared/model/Profile';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { StudentService } from 'src/app/shared/services/student_services/student.service';

@Component({
  selector: 'app-admission-letter',
  templateUrl: './admission-letter.component.html', 
  styleUrls: ['./admission-letter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionLetterComponent implements OnInit {

  dataFetch: boolean = false;
  admission_data:admission_data
  current_academic_details: current_academic_details;
  personal_data:personal_data;
  parent_data:parent_data;
  previous_academic_data: any;
  student_documents: any;
  dobInWords:any;
  public  config: AngularEditorConfig = {
    editable: false,
    showToolbar:false,
    spellcheck: true,
    height: 'fit-content',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  rules ='<ol><li><font face="Arial">Uniform is compulsory.</font></li><li><font face="Arial">Attending all scheduled classes is manditory.</font></li><li><font face="Arial">having attendance more that 80% is compulsary</font></li></ol>'
  student:any = this.studentService.getSelectedStudent;

  constructor(public studentService: StudentService,public apiService:ApiService,public dialogRef: MatDialogRef<AdmissionLetterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
   }

  async ngOnInit() {
    this.student.image = "assets/images/user.png"
    await this.fetchApi()
  }

  async fetchApi(){
    this.dataFetch = true
    
    this.admission_data = this.data.admission_data
        this.current_academic_details = this.data.current_academic_details
        this.personal_data = this.data.personal_data
        this.parent_data = this.data.parent_data
        this.previous_academic_data = this.data.previous_academic_data
        this.student_documents = this.data.student_documents
   }
  
   generatePdf(){
    
   }
}
