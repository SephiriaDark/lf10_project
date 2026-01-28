import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';
import {FormsModule} from "@angular/forms";

import {TokenService} from "../TokenService";


@Component({
  selector: 'app-employee-delete',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-delete.component.html'
})
export class EmployeeDeleteComponent {
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

  confirmDelete() {
    if (!this.employee?.id) return;

    const token =this.tokenService.getToken();

    this.http.delete(
      `http://localhost:8089/employees/${this.employee.id}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
      }
    ).subscribe({
      next: () => {
        this.saved.emit();
        this.close();
      },
      error: err => console.error('Delete failed', err)
    });
  }


}
