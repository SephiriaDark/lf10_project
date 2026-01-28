import {Component, Input} from '@angular/core';
import {Employee} from "../Employee";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  @Input() employee?: Employee;

  show = false;

  open(employee: Employee) {
    this.employee = employee;
    this.show = true;
  }

  close() {
    this.show = false;
  }
}
