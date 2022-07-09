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

  showConfirmDialog(){
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

  showDeleteConfirmDialog(){
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

  showUpdateConfirmDialog(){
    const confirmation = this.swalWithBootstrapButtons.fire({
      title: 'Are you sure, you want to update?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })

    return confirmation
  }

}
