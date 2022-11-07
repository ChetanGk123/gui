import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  error

  constructor(private _apiService: ApiService) {}

  /**
   * Getter for data
   */
  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  /**
   * Get data
   */
  getCommonData(): Observable<any> {
    return this._apiService.getTypeRequest("admission_form_data").pipe(
      tap((response: any) => {
        this._data.next(response.data);
      }),
    );
  }
}
