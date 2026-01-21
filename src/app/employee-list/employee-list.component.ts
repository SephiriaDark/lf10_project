import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject, Observable, of} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { AuthService } from "../auth.service";
import {EmployeeDetailsComponent} from "../employee-details/employee-details.component";
import {EmployeeEditComponent} from "../employee-edit/employee-edit.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent, EmployeeEditComponent],
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
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE4ZTc3NmUyMDUxZjFlNzVmMzA4ZWQxZjNkOTAwOGQwIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiNDlkZGY4ZDczYjYwMDQ3OGZmNGI2MzNmNzQ1YjdhYTlmODNlMWMyNzIzZThhM2QyZDRjZmM2MDZiZjhlZmM0MSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NjgzODg3OTMsImlhdCI6MTc2ODM4NTc5MywiYXV0aF90aW1lIjoxNzY4Mzg1NzkzLCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoibVJ0dFhsVk1KNjlKdXJNYmZjZ0g4U0ZGN1J4c3FkZldwNHY2bDY0ZCJ9.e6FosjbHe3nRSe9D0j4OIXCvLQrDbVKr232CVZuaRYI3gFLLH3eig7iVXzbow2vv9l2OU53iPXXFyRD5gRiwwLxkTos5F-RoBDl7ywM_Go7OV_jZ4Ihs_5HGUu8Cgm56gLtJVIwZ3WpnE-VJ9atzmvAKr3vT8bCHQvDV1l41JWbjpyd65e3WOF6ZepCbNLJMALE1mrv6pnuqlFpelqtFKtcP2nV8GXIXPoMtcDfPUmTs__40IgS8ZOcfsf68eAYmg-6GT11mHqvp_wfIGKMK_0N-VhG07iMfVJHh8-23UNgOeeuISOv5CcSb5SuwAMF8kSpfZ3A02h_UGVDrj6lTDpdVrEcJz3F51MY9f-n2Jrr-gY8ziBJoDgwOwsl1SuntwtbxtrF0CfQdAN_v4J6mX2N2GcBfG1KqrhwjebwKJNl-KqfQNKx3PAAKlPbzPRPQo_o3vgSWH7Uu71bGZ-wYiq88co93qGsj9VH5OpwJO70MZr902k14XIHFTM_fIpgyIr53R8gZ3csN8RQD1cKUO2wy5BdiMq1USz1VvU3-xrrFstOphSo8OQhUBt1gFhkJiFGu8Bu2Kc1h7-m3adtx09rPakUTTQIiWpezHZLRnL_gJ6wkHf5GOS8tKJ9zK1q7tswzC6JzwkMJOwqplw7wgdqS3BV6-MXd2mSOWUGbbuY'
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    }).subscribe({
      next: list => this.employeesSubject.next(list), // обновляем BehaviorSubject
      error: err => console.error(err)
    });
  }
  refreshList() {
    this.fetchData();
  }
}
