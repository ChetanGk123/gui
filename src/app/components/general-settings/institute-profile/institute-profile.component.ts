import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Institute } from '../../../shared/model/institute';
@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.scss']
})
export class InstituteProfileComponent implements OnInit {

  public imagePath;
  imgURL: any;
  
  model2: Date;
  constructor(public toast:ToastrService) {  }
  institute:Institute = {
    name: "Royal Palace",
    address: "Chandan, M53, Sector No57, Navanagar, Bagalkot, Opposite to horticulture garden",
    country: "India",
    email: "royalpalace@gamil.com",
    moto: "",
    number: "9972777455",
    website: "www.royalpalacelkp.com",
    logo: null
  }
  instituteForm: FormGroup = new FormGroup({
    name: new FormControl('Royal Palace',),
    moto: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl(''),
    website: new FormControl('',),
    address: new FormControl('',),
    country: new FormControl('',),
    logo: new FormControl(File)
  });

  ngOnInit(): void {
    //this.updateInstitute();
    this.instituteForm.setValue(this.institute);
  }
  file:any
  updateInstitute(){
    this.institute = this.instituteForm.value;
    // this.institute.name = this.instituteForm.get('name').value;
    // this.institute.moto = this.instituteForm.get('moto').value;
    // this.institute.number = this.instituteForm.get('number').value;
    // this.institute.email = this.instituteForm.get('email').value;
    // this.institute.website = this.instituteForm.get('website').value;
    // this.institute.address = this.instituteForm.get('address').value;
    // this.institute.country = this.instituteForm.get('country').value;
    this.institute.logo = this.imgURL
   
    
    //this.ngOnInit()    
  }

  preview(files) {
    if (files.length === 0){
      this.imgURL =""
      return;
    }
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.toast.error("Only images are supported.");
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
