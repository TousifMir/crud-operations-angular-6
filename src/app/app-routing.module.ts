import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: 'contact', component: ContactUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
