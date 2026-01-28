import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';

import {TokenService} from "../TokenService";


@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-edit.component.html',
})
export class EmployeeEditComponent {
  @Output() saved = new EventEmitter<void>();

  show = false;
  employee?: Employee;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  open(employee: Employee) {
    this.employee = { ...employee };
    this.show = true;
  }

  close() {
    this.show = false;
  }

  save() {
    if (!this.employee) return;

    const token =this.tokenService.getToken();

    const payload = {
      id: this.employee.id,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      street: this.employee.street,
      postcode: this.employee.postcode,
      city: this.employee.city,
      phone: this.employee.phone
    };
    this.http.put(
      `http://localhost:8089/employees/${this.employee.id}`,
      payload,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
      }
    ).subscribe({
      next: () => {
        console.log('Employee saved');
        this.saved.emit();
        this.close();
      },
      error: err => console.error('Save failed', err)
    });
  }
}
