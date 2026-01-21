import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';

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

  constructor(private http: HttpClient) {}

  open(employee: Employee) {
    this.employee = { ...employee };
    this.show = true;
  }

  close() {
    this.show = false;
  }

  save() {
    if (!this.employee) return;

    const token ='eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4ODFhYmEzMTRjYTdhYmM0MWFjOTZiNWJlZThmMzNkIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiZjhjMDNjOWU5ZDliZDc0ZGY3ZDQwZjVjNjRlODI1NDNhYjY1YTIyMzQ3MTA5NTJhNzQwYzUxN2I5YTE0ZjU4MSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njg5OTU4MzEsImlhdCI6MTc2ODk5MjgzMSwiYXV0aF90aW1lIjoxNzY4OTkyODMxLCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiQ09Db3NZTUFGUnBhUjRFVm1RSW1RSzJycEcwZHdwUzcwd2dVbVU0WCJ9.YuApKzh-DfUJyhddxoOsSACa0ENf9chaynfxw3Pe4G_nlqjoCwrZw-0Wxs2x_KfmLGInQGXKkv0bNQfH6vRZi-YC-379DHRSbtKweofJak8HeEbhDUIWgDhEtpadS_3RR4z6dsVr2JJjDdwhXIpe4tVZaSiafxq3EAoeVMjNjWdHtE9IoVrmkKDGV7W1298BTqw2logQCZ74i2SHJwwZaOabVhu54vUVOD_zMAIrMzuc3CD--cq0ZQ1Uv-2ai4JirmP14bs6aBz89U4WjvdDJF7ThaHXLeSO8LtPOvh8XDYGa92DDZQUw9wi3MPYNDIXWCY7j_6Ey7LginxjtnKNAHhOodmiRitEM280lCaRHhx8CdzBKYmnxp6x_am9psRY0pR5OK7eYTaO869mRBi1UXvKyhF2Pc48t0eTareBOcKib0f238WC7ErIpnzkVpWv7qdrU-M9qEzoyX_jWSvExOl8_9COf_gFsrgsGXIxp4W3Ay49CDY6XiHluDx9hwAIY_a9GWW8s7FxFrwLJmfM72PF7ImmfABKhx7u5qos2_FLDXibYM3tHnb_3GjeTJavAFl6HhErSmR0d6d-M7Vt_IqBHrmwb6zqlWBN1WZdJurHD-klVDVqU8riY0kMmDvEPe2CkAqlDciVb50L4o674VSqmraLMC9X4hfuwVqKO7c'

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
