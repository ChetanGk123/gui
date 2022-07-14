import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-documents',
  templateUrl: './profile-documents.component.html',
  styleUrls: ['./profile-documents.component.scss']
})
export class ProfileDocumentsComponent implements OnInit {
  @Input() Type
  @Input() person_id
  constructor() { }

  ngOnInit(): void {
    // console.log(this.person_id);
    
  }

}
