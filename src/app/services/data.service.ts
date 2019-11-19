import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  isEmployeeUpdate:Boolean = false;
  empoyeeObjToUpdate = {}

  constructor(private http: HttpClient) { }

  // http://dummy.restapiexample.com/

  getAllEmployees(): Observable<any> {
    return this.http.get<any[]>('http://dummy.restapiexample.com/api/v1/employees');
  }

  addEmployee(employeeObject): Observable<any> {
    return this.http.post<any[]>('http://dummy.restapiexample.com/api/v1/create', employeeObject);
  }

  deleteEmployee(employeeId): Observable<any> {
    return this.http.delete<any[]>('http://dummy.restapiexample.com/api/v1/delete/' + employeeId.toString());
  }

  updateEmployee(empId, employeeObject): Observable<any> {
    return this.http.put<any[]>('http://dummy.restapiexample.com/api/v1/update/' + empId, employeeObject);
  }
}
