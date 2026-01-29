import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';
import { AuthService } from "../auth.service";
import {Qualification} from "../Qualification";
import {QualificationService} from "../QualfikationService";


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

  availableQualifications: Qualification[] = [];
  selectedQualificationIds: number[] = [];
  originalQualificationIds: number[] = [];

  constructor(private http: HttpClient, private authService: AuthService,
              private qualificationService: QualificationService) {}

  ngOnInit() {
    this.loadQualifications();
  }
  loadQualifications() {
    this.qualificationService.getQualifications().subscribe({
      next: qualifications => {
        this.availableQualifications = qualifications;
      },
      error: err => console.error('Failed to load qualifications', err)
    });
  }

  open(employee: Employee) {
    this.employee = { ...employee };
    this.show = true;

    this.originalQualificationIds = employee.skillSet?.map(s => s.id!) || [];
    this.selectedQualificationIds = [...this.originalQualificationIds];
  }

  close() {
    this.show = false;
    this.selectedQualificationIds = [];
    this.originalQualificationIds = [];
  }
  toggleQualification(qualificationId: number) {
    const index = this.selectedQualificationIds.indexOf(qualificationId);
    if (index > -1) {
      this.selectedQualificationIds.splice(index, 1);
    } else {
      this.selectedQualificationIds.push(qualificationId);
    }
  }

  isSelected(qualificationId: number): boolean {
    return this.selectedQualificationIds.includes(qualificationId);
  }

  save() {
    if (!this.employee) return;

    const token = this.authService.getAccessToken();

    if (!this.authService.hasValidToken()) {
      console.error('Kein gültiger Token vorhanden. Bitte einloggen.');
      return;
    }

    const payload = {
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      street: this.employee.street,
      postcode: this.employee.postcode,
      city: this.employee.city,
      phone: this.employee.phone,
      skillSet: this.selectedQualificationIds
    };

    this.http.put(
      `http://localhost:8089/employees/${this.employee.id}`,
      payload,
      { headers: this.authHeaders(token) }
    ).subscribe({
      next: () => {
        this.saved.emit();
        location.reload();
        this.close();
      },
      error: err => console.error('Save failed', err)
    });
  }

  private authHeaders(token: string) {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }
}
