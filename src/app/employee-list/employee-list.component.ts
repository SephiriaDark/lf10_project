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
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0YzgyYmEwZDU1NWM5NDkzODg5Y2ViMGNiZGI2NTI5IiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiYTA0NjM3NzlkYWNhMDY4ZTAzNWFiMTg3NzI1OGYzOTk5MjljNTA3ODAyYTQ2YjVlMWZkZjQ2NDU1ZmY5ZGYxYiIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NjgzOTAzNjMsImlhdCI6MTc2ODM4NzM2MywiYXV0aF90aW1lIjoxNzY4Mzg3MzYzLCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiZElHOVRtdlRUb0dFS21HemJyNFo3SUxoaEk5TGdoQUlPWHp4Yk1wZSJ9.L777d40vwnn44gk00jb3ZI_nEE215MVuJUy9XODEmUiP_lsWmXFdG2ip0q4cGbIG_BVN4caD2EoyYfzFxXYBkKZ75qqgWsrzBCsN26-FJyaaql1KW0lzlAQAZdBADhteNDjDBgggoPu7ssHvW7GV4Ybpp0uSeAwvzARbZ2IrurpPNo-dNKDH6146BXDiLCJAeCDo7lnSBrK_fAAto4dJg28FF3DTAeEvv1u3zFYZyv9a1twon4A5L4uuH00QuPicYM77TRQfcRPlF2aj00TPkds4jERjinezMXCH5hwdeF62z4oGWaoSk7jdHhy4C4d8F6yeHXgHlrwoGjsGGgJxDUGhby5F4YJ9B0XqEy8HwiXcS8YaVb75rUvm1X7R69IZ2b8XVX_YW-2RDGpgBXD5_qoO9g1S_6qsGXSjVmebtmFrMjwBKyiuPoEL2gUbdLi2MPJfVTimxodmljzv00DLdBu9opl3IfKb-ZW2MwTQfZd9nz-EylXHgwxhorwJC4fVORhFy9pVccktRafglaRg5HNn5PhqMPNznRPUebhxNx9YvD_nvob1nL7m9TNfkzdeIk0eZv0Yiq36vCaJy2rz7I7ptk7PHtaD7yx11zklHewWDroWL2GCXRVZK4wIy9DDDSef8thjzs4MaPnAV8CIa3NziXs6_ov1HeBGy9WhNMM'
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    });
  }
}
