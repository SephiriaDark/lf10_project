import {Component, Input, ViewChild} from '@angular/core';
import {Employee} from "../Employee";
import {CommonModule} from "@angular/common";
import {EmployeeEditComponent} from "../employee-edit/employee-edit.component";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, EmployeeEditComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  @Input() employee?: Employee;
  @ViewChild('editModal') editModal!: EmployeeEditComponent;

  show = false;

  open(employee: Employee) {
    this.employee = employee;
    this.show = true;
  }

  close() {
    this.show = false;
  }
  edit() {
    if (!this.employee) return;

    this.close();
    this.editModal.open(this.employee);
  }
}
