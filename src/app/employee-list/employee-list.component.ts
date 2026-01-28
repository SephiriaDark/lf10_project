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
import {FormsModule} from "@angular/forms";

import {TokenService} from "../TokenService";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent, EmployeeEditComponent, EmployeeCreateComponent, EmployeeDeleteComponent, FormsModule],
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
  filter = {
    firstName: '',
    lastName: '',
    city: '',
    skill: ''
  };

  private allEmployees: Employee[] = [];

  fetchData() {
    const token =this.tokenService.getToken();
    this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    }).subscribe({
      next: list => {
        this.allEmployees = list;
        this.employeesSubject.next(this.sortById(list))
      },
      error: err => console.error(err)
    });
  }
  refreshList() {
    this.fetchData();
  }
  applyFilter() {
    const filtered = this.allEmployees.filter(e => {

      if (this.filter.firstName &&
        !e.firstName?.toLowerCase().startsWith(this.filter.firstName.trim().toLowerCase())) {
        return false;
      }

      if (this.filter.lastName &&
        !e.lastName?.toLowerCase().startsWith(this.filter.lastName.trim().toLowerCase())) {
        return false;
      }

      if (this.filter.city &&
        !e.city?.toLowerCase().startsWith(this.filter.city.trim().toLowerCase())) {
        return false;
      }

      if (this.filter.skill) {
        const hasSkill = e.skillSet?.some(s =>
          s.skill.toLowerCase().startsWith(this.filter.skill.trim().toLowerCase())
        );
        if (!hasSkill) return false;
      }

      return true;
    });

    this.employeesSubject.next(this.sortById(filtered));
  }
  private sortById(list: Employee[]): Employee[] {
    return [...list].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  }
}
