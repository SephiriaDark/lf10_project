import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-create.component.html'
})
export class EmployeeCreateComponent {
  @Output() saved = new EventEmitter<void>();
  show = false;
  employee: Employee = {
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    postcode: '',
    city: ''
  };

  open() {
    this.show = true;
  }
  close() {
    this.show = false;
  }
  constructor(private http: HttpClient) {}

  save() {
    const token ='eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0YzgyYmEwZDU1NWM5NDkzODg5Y2ViMGNiZGI2NTI5IiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiYTA0NjM3NzlkYWNhMDY4ZTAzNWFiMTg3NzI1OGYzOTk5MjljNTA3ODAyYTQ2YjVlMWZkZjQ2NDU1ZmY5ZGYxYiIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njk1OTY2NjgsImlhdCI6MTc2OTU5MzY2OCwiYXV0aF90aW1lIjoxNzY5NTkzNjY4LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoieDBoRmhRdEhhVUVMNW1JdFc3bHJxWVhSaFd2b2pxUUdOeFBnQlh1WiJ9.Pj1tG0v1CAHQFW_mBzOOGvmvdIV3PFVYCopQz-23IOHxayVtwX2MJzqiMmzH1M4vpt2akpqNorwnbzv1oAtLPTAnQGAMXKxiHzrl59A7Y5BLs8tKVYtOupKV0hoiHfSuv8skcjr29LdmyYhyYz0mrOcdbbKUzvgwL7ymwny0Oe-XQIwc9lw6eNymEnGCv0NFm0jqzr7o13CiU3xyvpV0dzhE64RJPtya8lR-YOcjPUHgvr7f1oCFY5GqOdTH-sb_a3VWLVF0pVwFWG_ppeKZro4UaQtrtW8mSPRKhdgDGG5JLrQmiOGVvnVxNtJBqo8Q_JROh405tNJk4_HoakNimhP_mVIc1iNWyXaOlGIE-j9ojMQPLQ7rhokiSgSmue4IReT5YNXLC6kcVZQ8FtkpvAXvOdOz1EKNMPlvH-lP3WRDQvVxt_SujBQHduNwPjCuaw_Is6bfF256RAjCEczkB4Fqq4Qc3953Iwx-2g1pB2nslTISBYAkMxWzQfBbvdOLcP6AXKd4qMJYA5jJK8p97Ri2T9_WyjaXlxVP1CShN90xbYjFeoZ9_xTzjRr1ER7g3oVD3iw1uiGC_3hnfkUErirDuBJIeuor36B35kETgvvUth2K6tao9vApFywHFPtrKwZUnhi0kh9tA65lbTYLm5POIWxeaU0PJCe4e9QACB0'

    this.http.post(
      'http://localhost:8089/employees',
      this.employee,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
      }
    ).subscribe({
      next: () => {
        this.saved.emit();
        this.close();
      },
      error: err => console.error('Create failed', err)
    });
  }
}
