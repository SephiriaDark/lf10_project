import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-employee-delete',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-delete.component.html'
})
export class EmployeeDeleteComponent {
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

  confirmDelete() {
    if (!this.employee?.id) return;

    const token ='eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4ODFhYmEzMTRjYTdhYmM0MWFjOTZiNWJlZThmMzNkIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiZjhjMDNjOWU5ZDliZDc0ZGY3ZDQwZjVjNjRlODI1NDNhYjY1YTIyMzQ3MTA5NTJhNzQwYzUxN2I5YTE0ZjU4MSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njk1OTQxNDQsImlhdCI6MTc2OTU5MTE0NCwiYXV0aF90aW1lIjoxNzY5NTkxMTQ0LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiSWVwQXo5M0s0RVNDZksyMTVVWGMxblZ5elRRQVFmUVJVbVlaOVJwYSJ9.ebzNR51yUpCRtR75hFXXwsXX6l1ipZbRh_OuM7wzJaK1PsgRSNCXoFod2JMBu46lZea1uRyZNB3yQwKy3hplVlmJGsdl12OKjK-uLlT7tQ0bHlxyfZ5QhrKr8Wm5uNNlHPK-T-tyhVlK9r2tWLJPJ7cfuZzQyMexlxx4v5eLX0TCp-fDw2GdaIhjJ6Ga8pEbD6ByjshaSMDju-TLcrYgeh14ebQcmqD7HqwsC58t5AyFql56mAg6YErS-K7t6IFpzEY1y9LJr76ToBI5ntjdH35jWH8x1FsjThEYfw7oKPo3jk3pViwl_QdKM3wvkEeAcM_i-heIJp8nzoIJJhKjIY07sWmpWCCrm2SMlDxw2NzVPBjPvr2tniL2f7hDrzatlL2hrWcKTYQDTHtXm71Dqf-CgyW9BTp35ohADqkyIvrhAedP_34d9yqZVgissLZp17BhLY7mZvEzgsCMU-HkryC-iHGmLU409ORGY-nST-7MKB3vWcyovtzvbPoCJVxLc41z4lN7ZVK3UNTKgUeC8hmUp-s7gKmKKO4H3OfBV_PUktHzwOtYwkad-2iKN3GVZojFeQc53gnif0lgd5HVv3caaDU3wo-7P-wgefeaGQZ7u6oC2oLWg0e6HBx5Tqi2C_GLKuomH_3jDqBFcMP-KpoBS1raG1fD82CeLfTOgLM'

    this.http.delete(
      `http://localhost:8089/employees/${this.employee.id}`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
      }
    ).subscribe({
      next: () => {
        this.saved.emit();
        this.close();
      },
      error: err => console.error('Delete failed', err)
    });
  }


}
