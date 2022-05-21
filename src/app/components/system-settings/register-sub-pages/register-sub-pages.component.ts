import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-register-sub-pages',
  templateUrl: './register-sub-pages.component.html',
  styleUrls: ['./register-sub-pages.component.scss']
})
export class RegisterSubPagesComponent implements OnInit {

  public dataFetch:boolean = false;
  addValue:string = "";
  filterValue:string = "";
  List:any = [];
  moduleList:any = [];
  pageList:any = [];
  feather_icons = ["activity", "airplay", "alert-circle", "alert-octagon", "alert-triangle", "align-center", "align-justify", "align-left", "align-right", "anchor", "aperture", "archive", "arrow-down-circle", "arrow-down-left", "arrow-down-right", "arrow-down", "arrow-left-circle", "arrow-left", "arrow-right-circle", "arrow-right", "arrow-up-circle", "arrow-up-left", "arrow-up-right", "arrow-up", "at-sign", "award", "bar-chart-2", "bar-chart", "battery-charging", "battery", "bell-off", "bell", "bluetooth", "bold", "book-open", "book", "bookmark", "box", "briefcase", "calendar", "camera-off", "camera", "cast", "check-circle", "check-square", "check", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "chevrons-down", "chevrons-left", "chevrons-right", "chevrons-up", "chrome", "circle", "clipboard", "clock", "cloud-drizzle", "cloud-lightning", "cloud-off", "cloud-rain", "cloud-snow", "cloud", "code", "codepen", "coffee", "command", "compass", "copy", "corner-down-left", "corner-down-right", "corner-left-down", "corner-left-up", "corner-right-down", "corner-right-up", "corner-up-left", "corner-up-right", "cpu", "credit-card", "crop", "crosshair", "database", "delete", "disc", "dollar-sign", "download-cloud", "download", "droplet", "edit-2", "edit-3", "edit", "external-link", "eye-off", "eye", "facebook", "fast-forward", "feather", "file-minus", "file-plus", "file-text", "file", "film", "filter", "flag", "folder-minus", "folder-plus", "folder", "gift", "git-branch", "git-commit", "git-merge", "git-pull-request", "github", "gitlab", "globe", "grid", "hard-drive", "hash", "headphones", "heart", "help-circle", "home", "image", "inbox", "info", "instagram", "italic", "layers", "layout", "life-buoy", "link-2", "link", "linkedin", "list", "loader", "lock", "log-in", "log-out", "mail", "map-pin", "map", "maximize-2", "maximize", "menu", "message-circle", "message-square", "mic-off", "mic", "minimize-2", "minimize", "minus-circle", "minus-square", "minus", "monitor", "moon", "more-horizontal", "more-vertical", "move", "music", "navigation-2", "navigation", "octagon", "package", "paperclip", "pause-circle", "pause", "percent", "phone-call", "phone-forwarded", "phone-incoming", "phone-missed", "phone-off", "phone-outgoing", "phone", "pie-chart", "play-circle", "play", "plus-circle", "plus-square", "plus", "pocket", "power", "printer", "radio", "refresh-ccw", "refresh-cw", "repeat", "rewind", "rotate-ccw", "rotate-cw", "rss", "save", "scissors", "search", "send", "server", "settings", "share-2", "share", "shield-off", "shield", "shopping-bag", "shopping-cart", "shuffle", "sidebar", "skip-back", "skip-forward", "slack", "slash", "sliders", "smartphone", "speaker", "square", "star", "stop-circle", "sun", "sunrise", "sunset", "tablet", "tag", "target", "terminal", "thermometer", "thumbs-down", "thumbs-up", "toggle-left", "toggle-right", "trash-2", "trash", "trending-down", "trending-up", "triangle", "truck", "tv", "twitter", "type", "umbrella", "underline", "unlock", "upload-cloud", "upload", "user-check", "user-minus", "user-plus", "user-x", "user", "users", "video-off", "video", "voicemail", "volume-1", "volume-2", "volume-x", "volume", "watch", "wifi-off", "wifi", "wind", "x-circle", "x-square", "x", "youtube", "zap-off", "zap", "zoom-in", "zoom-out"]
  ComponentForm: FormGroup = new FormGroup({
    main_component_id:new FormControl('',[Validators.required]),
    sub_component_id:new FormControl(''),
    title:new FormControl('',[Validators.required]),
    path:new FormControl('',[Validators.required]),
    icon:new FormControl(''),
    type:new FormControl('',[Validators.required]),
    badgeType:new FormControl(''),
    badgeValue:new FormControl(''),
    active:new FormControl(''),
    bookmark:new FormControl(''),
    display_order:new FormControl(0,[Validators.required]),
  })
  constructor(public apiService:ApiService,private dialog: DialogService, public spinner:SpinnerService, public toster:ToastrService) { }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  SortType = SortType;
  
  ngOnInit() {
    this.dataFetch = true
    this.apiService.getTypeRequest('table_data/COMPONENT').subscribe((result:any) => {
      if(result.result){
        this.moduleList = result.data 
      }
      else{
        this.toster.error(result.message);
      }
      this.dataFetch = false
    })
    this.dataFetch = true
    this.apiService.getTypeRequest('table_data/SUB_COMPONENT').subscribe((result:any) => {
      if(result.result){
        this.pageList = result.data 
        this.List = result.data 
        
      }
      else{
        this.toster.error(result.message);
      }
      this.dataFetch = false
    })
  }

  onFilter(data:any){
    this.List =[];
    this.pageList.filter( (x) => {
      if(x.name.toLowerCase().includes(data.toLowerCase()))
      this.List.push(x)
    })
  }

  onClear(){
    this.List = this.moduleList;

  }

  updateData(data){
    this.ComponentForm.patchValue({
      sub_component_id:data.id,
      main_component_id:data.id,
      type:data.type,
      icon:data.icon,
      path:data.path,
      title:data.name,
      display_order:data.display_order
    })
  }

  onClearForm(){
    this.ComponentForm.reset({
      sub_component_id:'',
      main_component_id:'',
      type:'',
      icon:'',
      path:'',
      title:'',
      active:'',
      display_order:''
    })
  }

  onAddNew(){
    if(this.ComponentForm.valid){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false,
      })
      
        if(!this.ComponentForm.get('sub_component_id').value)
        {
          this.apiService.postTypeRequest('sub_component/insert',this.ComponentForm.value).subscribe((result:any) => {
            if(result.result){
              this.ngOnInit();
              this.toster.success("New Data Added")
              swalWithBootstrapButtons.fire(
                'Added!',
                result.message,
                'success'
              )
            }
            else{
              this.toster.error(result.message)
            }
          })
        }
        else{
          this.apiService.postTypeRequest('sub_component/update',this.ComponentForm.value).subscribe((result:any) => {
            if(result.result){
              this.ngOnInit();
              this.toster.success("New Data Added")
              swalWithBootstrapButtons.fire(
                'Added!',
                result.message,
                'success'
              )
            }
            else{
              this.toster.error(result.message)
            }
          })
        }
    }
    this.onClearForm()
  }

  async onDelete(id:string){
    var Request_Data = {
      sub_component_id:id
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure, you want to delete?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.apiService
          .postTypeRequest("sub_component/delete", Request_Data)
          .toPromise()
          .then((result: any) => {
            if (result.result) {
              this.toster.warning("Data deleted");
              swalWithBootstrapButtons.fire(
                'Deleted!',
                result.message,
                'success'
              )
              this.ngOnInit();
            } else {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                result.message,
                'error'
              )
              this.toster.error(result.message);
            }
          });
      } 
    })
  }

}

