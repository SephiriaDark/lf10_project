import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxNzMwODk5OTM0ZmRlZTc4MGU3Yzg1NWIzZjUxOTBlIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiOTdhMzRmMWE2ZDk2YzU0OGViZGNmZjYxODgxMGE2YzU5MDMwZjJhMDcxNmFlYjg3ZjNkMjBhOWFkMWVkYWUwMSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NjkzNTE1MDgsImlhdCI6MTc2OTM0ODUwOCwiYXV0aF90aW1lIjoxNzY5MzQ4NTA4LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoia1BsUWVVSU55bzVETEMzMVFJbEloVGxBdlk5Q1pQUHZYM0ZpRVpJMSJ9.SZMy0C3Fsg1ZNdIXTIo5apyre6Aq5SXrmhW1waMlX_jQh_zvSxrDG2re1rHEAc0AjaGcDvF0L5fEH39tA1BggTfMSa9-2odhQc_5Jo46BEZhZCcwFFnW7g38a8im4MvT2Ry2v53ikeT0ltMa8N2_KpWhmPDexYLXAefOqEHIi4260992pDETaHTmSYegXwswlWccSIJFue0KUcmPla4OJwsmJYvsma7yimHuLckYbW-DfpFitv34lcsyxESkH_sXjHwwwbl47urFmyKZ2alRfQs4nhs_mmJxJfqSkAiEmGcla8FjRCf4uzp314O51deYQcZ8j6ZWgnmhFWM9eth6mcxFmWf_9_aDww_V3EyiNyAHwBL5BQ10iPEPd9N8rjs9hXxdVi3AlDjnOjTBH3mrZ2QrMJs0Tn_VbdjuCfKI63LQJmniycyfB1-2c72g3X-4XEZEsXe7hKSB4XM48ELewShjrNrJNgVsHVSj_QU_K3xNtJRNSBWJ360SGxxwxt6a3MGm3r-cJj3lj_Y0S4tn8I7PjT5jvk9v4YngdNd4FdqLA1wONPz6F0aeOqWa-hjyoy6Zjj5aTO8ZNf63BKQuOCFRmNxvJsrUK2E7im7--q0XJDSZ2kyqrV2h9PufAsIVG-SiiLNVsZ_CL0nH1pbRi2sJv3KsYoVvA-r2XNNHjRQ'
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    });
  }
}
