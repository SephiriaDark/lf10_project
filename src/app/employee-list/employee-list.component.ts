import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject, Observable, of} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { AuthService } from "../auth.service";
import {EmployeeDetailsComponent} from "../employee-details/employee-details.component";
import {EmployeeEditComponent} from "../employee-edit/employee-edit.component";
import {EmployeeCreateComponent} from "../employee-create/employee-create.component";
import {EmployeeDeleteComponent} from "../employee-delete/employee-delete.component";

import {TokenService} from "../TokenService";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent, EmployeeEditComponent, EmployeeCreateComponent, EmployeeDeleteComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.fetchData();
  }

  fetchData() {
    const token =this.tokenService.getToken();
    this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    }).subscribe({
      next: list => this.employeesSubject.next(list),
      error: err => console.error(err)
    });
  }
  refreshList() {
    this.fetchData();
  }
}
