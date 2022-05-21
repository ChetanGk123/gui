import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rules-n-regulations',
  templateUrl: './rules-n-regulations.component.html',
  styleUrls: ['./rules-n-regulations.component.scss']
})
export class RulesNRegulationsComponent implements OnInit {

  //public htmlContent = '';
  rulesNRegulations: FormGroup;
  public value = '<ol><li><font face="Arial">Uniform is compulsory.</font></li><li><font face="Arial">Attending all scheduled classes is manditory.</font></li><li><font face="Arial">having attendance more that 80% is compulsary</font></li></ol>'
  constructor(private fb: FormBuilder,public toster: ToastrService) 
  {
    this.rulesNRegulations = this.fb.group({
      htmlContent: ['',],
    })  
  }

  ngOnInit(): void {  }

  public  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
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


  showToast(){
  }
  ngOnDestroy() {
  }

}
