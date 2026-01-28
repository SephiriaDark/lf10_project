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
    const token ='eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4ODFhYmEzMTRjYTdhYmM0MWFjOTZiNWJlZThmMzNkIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiZjhjMDNjOWU5ZDliZDc0ZGY3ZDQwZjVjNjRlODI1NDNhYjY1YTIyMzQ3MTA5NTJhNzQwYzUxN2I5YTE0ZjU4MSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njg5OTU4MzEsImlhdCI6MTc2ODk5MjgzMSwiYXV0aF90aW1lIjoxNzY4OTkyODMxLCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiQ09Db3NZTUFGUnBhUjRFVm1RSW1RSzJycEcwZHdwUzcwd2dVbVU0WCJ9.YuApKzh-DfUJyhddxoOsSACa0ENf9chaynfxw3Pe4G_nlqjoCwrZw-0Wxs2x_KfmLGInQGXKkv0bNQfH6vRZi-YC-379DHRSbtKweofJak8HeEbhDUIWgDhEtpadS_3RR4z6dsVr2JJjDdwhXIpe4tVZaSiafxq3EAoeVMjNjWdHtE9IoVrmkKDGV7W1298BTqw2logQCZ74i2SHJwwZaOabVhu54vUVOD_zMAIrMzuc3CD--cq0ZQ1Uv-2ai4JirmP14bs6aBz89U4WjvdDJF7ThaHXLeSO8LtPOvh8XDYGa92DDZQUw9wi3MPYNDIXWCY7j_6Ey7LginxjtnKNAHhOodmiRitEM280lCaRHhx8CdzBKYmnxp6x_am9psRY0pR5OK7eYTaO869mRBi1UXvKyhF2Pc48t0eTareBOcKib0f238WC7ErIpnzkVpWv7qdrU-M9qEzoyX_jWSvExOl8_9COf_gFsrgsGXIxp4W3Ay49CDY6XiHluDx9hwAIY_a9GWW8s7FxFrwLJmfM72PF7ImmfABKhx7u5qos2_FLDXibYM3tHnb_3GjeTJavAFl6HhErSmR0d6d-M7Vt_IqBHrmwb6zqlWBN1WZdJurHD-klVDVqU8riY0kMmDvEPe2CkAqlDciVb50L4o674VSqmraLMC9X4hfuwVqKO7c'
    this.http.get<Employee[]>('http://localhost:8089/employees', {
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
