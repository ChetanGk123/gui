import { Injectable } from '@angular/core';

declare var require
const Swal = require('sweetalert2')

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
  })
  constructor() { }

  showSuccessMessage(title:string,message:string){
    this.swalWithBootstrapButtons.fire(
      title,
      message,
      'success'
    )
  }

  showErrorMessage(title:string,message:string){
    this.swalWithBootstrapButtons.fire(
      title,
      message,
      'error'
    )
  }

  showWarningMessage(title:string,message:string){
    this.swalWithBootstrapButtons.fire(
      title,
      message,
      'warning'
    )
  }

  showConfirmMessage(){
    const confirmation = this.swalWithBootstrapButtons.fire({
      title: 'Are you sure, you want to delete?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })

    return confirmation
  }

}
