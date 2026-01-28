import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';
import {TokenService} from "../TokenService";

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-create.component.html'
})
export class EmployeeCreateComponent {
  @Output() saved = new EventEmitter<void>();
  show = false;
  employee: Employee = {
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    postcode: '',
    city: ''
  };

  open() {
    this.employee = {
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      postcode: '',
      city: '',
      skillSet: []
    };
    this.show = true;
  }
  close() {
    this.show = false;
  }
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  save() {
    const token =this.tokenService.getToken();

    this.http.post(
      'http://localhost:8089/employees',
      this.employee,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
      }
    ).subscribe({
      next: () => {
        this.saved.emit();
        this.close();
      },
      error: err => console.error('Create failed', err)
    });
  }
}
