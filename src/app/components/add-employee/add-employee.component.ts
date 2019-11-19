import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr'; // To show success/Error Messages

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeName: String;
  employeeAge: String;
  employeeSalary: String;
  isEditEmployee:Boolean = false;
  employeeUpdateObj;

  constructor(private dataService: DataService, private toastr:ToastrService) { }

  ngOnInit() {
    // Employee Update Check because, same component has been used for add & update.
    // Some data has been stored in the data.service when update option is clicked in employee-list component
    this.isEditEmployee = this.dataService.isEmployeeUpdate;
    if(this.isEditEmployee) {
      this.employeeUpdateObj = this.dataService.empoyeeObjToUpdate;
      // Assign the employee object values to our inout fields/ngModel
      this.employeeName = this.employeeUpdateObj["employee_name"];
      this.employeeAge = this.employeeUpdateObj["employee_age"];
      this.employeeSalary = this.employeeUpdateObj["employee_salary"];

      this.dataService.isEmployeeUpdate = false; // Reset update mode to false
    }
  }

  addEmployee() {
    // Validate for valid inputs
    if(!this.validateFields()) {
      return; // Stop execution in case of any validation errors      
    }

    // Create request object
    let requestObject = {
      name: this.employeeName,
      salary: this.employeeAge,
      age: this.employeeSalary
    }

    // Add employee api service call
    this.dataService.addEmployee(requestObject).subscribe(data => {
      this.toastr.success("Employee Added Successfully!"); // success message
      // Clear form fields once the employee added successfully
      this.clearFields();
    });
  }

  clearFields() {
    this.employeeName = '';
    this.employeeAge = '';
    this.employeeSalary = '';
  }

  validateFields() {
    if(this.employeeName && this.employeeAge && this.employeeSalary) {
      return true;
    }
    else {
      return false;
    }
  }

  updateEmployee() {
    let requestObject = {
      name: this.employeeName,
      salary: this.employeeAge,
      age: this.employeeSalary
    }

    this.dataService.updateEmployee(this.employeeUpdateObj.id, requestObject).subscribe(data => {
      this.toastr.success("Employee Updated Successfully!"); // Show success message
      this.clearFields();// Clear form fields once the employee gets updated successfully
      
      // Clear all the stored information about the employee update
      this.dataService.empoyeeObjToUpdate = {}
      this.dataService.isEmployeeUpdate = false;
      this.isEditEmployee = false;
    },
    error => {                
      this.toastr.error("Error occured during update!"); // Show error message
    });
  }

}
