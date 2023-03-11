import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/shared/services/auth/api.service';

@Component({
  selector: 'app-edit-assigned-marks',
  templateUrl: './edit-assigned-marks.component.html',
  styleUrls: ['./edit-assigned-marks.component.scss']
})
export class EditAssignedMarksComponent implements OnInit {

  selectedStudentList:any[] = []
  studentList:any[] = []
  navigation = "visited"
  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef, public apiService: ApiService,public toster: ToastrService) { }

  ngOnInit(): void {
    // console.log(this.config.data);
    
  }

  copyStudents(){
    this.selectedStudentList.forEach((student:any)=>{
      var StudentData = {
        student_id: student.student_id,
        admission_no: student.admission_no,
        f_name: student.f_name,
        m_name: student.m_name,
        l_name: student.l_name,
        marks: student.max_marks,
        grade: student.grade,
      };
      this.studentList.push(StudentData)
    })
  }

  submit(){
    // console.log(this.studentList);
     /* 
     API: /save_student_marks/operation(insert/update/delete)
    Payload:{
                "report_id":1,
                "subject_allocation_id":2,
                "student_ids":[2,3,11,12,6,7,8,9,10],
                "marks":[95,85,75,65,55,45,34,21,15],
                "marks_ids":[4,5,6,7,8,9,10]
            } */
            var student_ids = []
            var marks_ids = []
            var marks = []
            this.studentList.forEach((student:any)=>{
              this.config.data.studentList.find((element:any,index:number)=>{
                if(student.student_id == element.student_id){
                  this.config.data.studentList[index].max_marks = student.marks
                }
              })
              marks_ids.push(student.student_id)
            })
            this.config.data.studentList.forEach(student => {
              if(student.max_marks){
                student_ids.push(student.student_id)
                marks.push(student.max_marks)
              }
            });
            var data = {
              report_id: this.config.data.commonForm.report_id,
              subject_allocation_id: this.config.data.commonForm.subject_allocation_id,
              student_ids:student_ids,
              marks_ids: marks_ids,
              marks:marks
            }
            // console.log(data);
            try {
              this.apiService
                .postTypeRequest("save_student_marks/update", data)
                .toPromise()
                .then((result: any) => {
                  if (result.result) {
                    this.toster.success(result.message);
                    this.ref.close(true)
                    //this.getSubjects()
                  } else {
                    this.toster.error(result.message);
                  }
                });
            } catch (error) {
              this.toster.error(error);
            }
  }

}
