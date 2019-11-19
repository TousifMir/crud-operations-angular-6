import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr'; // To show success/Error Messages

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList = [];
  showLoader:Boolean = false;

  constructor(private dataService: DataService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {   
    this.getEmployeeList();
  }

  deleteEmp(empID) { 
    this.dataService.deleteEmployee(empID).subscribe(response => {
      this.toastr.success(response["success"]["text"]); // Show success message
      this.getEmployeeList(); // Get latest employee list
    },
    error => {                
      this.toastr.error("Deletion Failed!"); // Show error message
    });
  }

  getEmployeeList() {
    this.showLoader = true;
    this.dataService.getAllEmployees().subscribe(data => {
      this.employeeList = data; // Get the list & assign it to a property
      this.showLoader = false;
    },
    error => {                
      this.toastr.error("Error occured!"); // Show error message
    });
  }

  updateEmp(employeeObject) {
    this.dataService.empoyeeObjToUpdate = employeeObject; // Store the employee object seletced for updation
    this.dataService.isEmployeeUpdate = true; // Set the update status to true as we are using same component for add & update
    this.router.navigate(['addEmployee']); // Navigate to add-employee component
  }

}
