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
    private authService: AuthService
  ) {
    this.fetchData();
  }

  fetchData() {
    const token ='eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0YzgyYmEwZDU1NWM5NDkzODg5Y2ViMGNiZGI2NTI5IiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiYTA0NjM3NzlkYWNhMDY4ZTAzNWFiMTg3NzI1OGYzOTk5MjljNTA3ODAyYTQ2YjVlMWZkZjQ2NDU1ZmY5ZGYxYiIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njk1OTUwNzksImlhdCI6MTc2OTU5MjA3OSwiYXV0aF90aW1lIjoxNzY5NTkyMDc5LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoid2FnT3BhU0VBaXpzM0liUExNeDNsTnhjYTUycWJEYkcyRTJxeTl6VCJ9.eeTT62i1IB6BxJrY5giSNH_PgE-SbpXDwujzoIcuJjlohCeoXFZIhOj3qglzIhDLniTtzK8GvltE0cgoIWX5aoFTZicetPrBOcIyinPxXOe3ixHeBlYtSHKITrNzH0qltw8ekxjOLjKqpITOEygDmNLfIp9MYuetBuPhiMjMi9U9ltGXGIsCtb2x59Pz_SvrrnK09j1OZRdxTgOC8kAFt9UEYWLVd0EFF3784JaKJ29HpF1Fp9Pt-qKDhYa4ZIvrUTKdjF_RR9pitgEGARYMFqIIRolfwlW_Q59NSP4A92v_rdo4oJA3h2Ptngb7yP9LmQA5JnKPiGnkJWYhkm0NJP--kAlSeIVMWtCxE7wc8tPiAlvDpJERghgI1sR1sDe1f_a9omQGzcW9vJ614kBxHtBZqPz2sQKMYeu8Oq0EttZoVhwzt3nSUqArHuC77d_GO2WyJuxC5UlB0bcVJyMDH0nZjjgKBH1amih6hosGECBG3i9obM4HCp6D5bJSNJIEvRj6bqey-qbQZGWPh6f557VVHOTz3rpYIz69SI-vPT5NN6esy5M1BPxklTIyqz0z6lLpdw2PbdbpWNiKCjctj66-y5H8f_BgMtHlLgJXJ3H1iiUt6JN63vP2yD3i7FkRJYMmI5BYiVluE2T8d6SJENnBlfAXNNn7ISGKbaIoEJ4'
    this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    }).subscribe({
      next: list => this.employeesSubject.next(list),
      next: list => this.employeesSubject.next(list),
      error: err => console.error(err)
    });
  }
  refreshList() {
    this.fetchData();
  }
}
