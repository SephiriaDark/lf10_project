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
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxNzMwODk5OTM0ZmRlZTc4MGU3Yzg1NWIzZjUxOTBlIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiOTdhMzRmMWE2ZDk2YzU0OGViZGNmZjYxODgxMGE2YzU5MDMwZjJhMDcxNmFlYjg3ZjNkMjBhOWFkMWVkYWUwMSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NjkyOTM1NTcsImlhdCI6MTc2OTI5MDU1NywiYXV0aF90aW1lIjoxNzY5MjkwNTU3LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiOW9mRlpXNUR6N0l1MFd2emNvNXZhU3kySk0xNkNKVXNYQVVuOWp5cCJ9.F6FWuwL7F_zTU5A5HBXTAZCvOEedQRFBL6Nk0cXHq2-u58TL3WxN1dwD9qgU2FcJl_FRYzIiPHRpwJra8gWbrSPESvY27r4gHOaImCJlgMvfkbtfrckDjG4twxLKZT2iAFrJuAl17rdSFvQJMpHJchRJY_4ZkuZBa_8U7DGp0PSb1NZ1vF57mi-NfZ7b-pyIQYQ7-fTRcFlLup_AmjdX71kKSBYFR9D6fluj4wdC02_4Gwu7x7yWg_AerOcjfHxw6vibR-9KqGm4o0rieXcTGwqOO-3P4Hfsnbtsr7bDAVd-Vsi79irWEWpkJ5FkjGuc98-dT-oyu9sIvs1swA68Kj_58lTSGgDgw7c8ZV-jEuJ_TlxHhLdHkREWL_HSePHP2XDb7gIWqbmjCPvUtWoaSV6dSTQ1H8xlT7uNdY5EWWN0U9xIdduRaHq-iWS_4BPYep1HVLGJwf4XGnm45OnzJW3dt1gQwDK1svjO2ukexb87iJgyrsYPXIAkSGweXn0lX-A8_FnWDFRjeWzjjf2UIUNStcyKduw3tuFft_YpL0nYdCXA2rKrf-sKlSGssLBYz0KaKA38zYiZsMil5G6e60lCf2U732lLhH4UrSUBprs3ngnFe2Vwc2Ee_Ao_Iz3gv15_4BOOgqbjxExqTPMLcDIJFKpO1JW5Fhd1c-t8DBs'
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    });
  }
}
