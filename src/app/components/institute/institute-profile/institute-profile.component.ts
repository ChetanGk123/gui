import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InstituteService } from 'src/app/shared/services/institute_services/institute.service';

@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.scss']
})
export class InstituteProfileComponent implements OnInit {

  editInstitute:boolean = false;
  card:string = "Institute Information";
  institute: any 
  instituteForm: FormGroup = new FormGroup({
    name: new FormControl('Royal Palace',),
    moto: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl(''),
    website: new FormControl('',),
    address: new FormControl('',),
    country: new FormControl('',),
    logo: new FormControl(new File([],''))
  });
  public imagePath;
  imgURL: any;

  constructor(public instituteService:InstituteService) { }

  ngOnInit() {
    this.institute = this.instituteService.getSelectedInstitute; 
    this.instituteForm.patchValue({
      name:this.institute.name??"",
      moto:this.institute.moto??"",
      number:this.institute.phone_number??"",
      email:this.institute.email??"",
      website:this.institute.website??"",
      address:this.institute.address??"",
      country:this.institute.country??"",
      logo:this.institute.logo_location??""
    })
    this.instituteForm.updateValueAndValidity()
  }

  preview(files) {
    if (files.length === 0){
      this.imgURL =""
      return;
    }
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      //this.toast.error("Only images are supported.");
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
