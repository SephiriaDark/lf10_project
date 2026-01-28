import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';

import {TokenService} from "../TokenService";
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

  constructor(private http: HttpClient, private tokenService: TokenService,
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

    const token =this.tokenService.getToken();

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
        this.updateQualifications(this.employee!.id!, token);
        this.saved.emit();
        this.close();
      },
      error: err => console.error('Save failed', err)
    });
  }
  private updateQualifications(employeeId: number, token: string) {
    // Знаходимо які треба додати і які видалити
    const toAdd = this.selectedQualificationIds.filter(
        id => !this.originalQualificationIds.includes(id)
    );
    const toRemove = this.originalQualificationIds.filter(
        id => !this.selectedQualificationIds.includes(id)
    );

    const totalOperations = toAdd.length + toRemove.length;

    if (totalOperations === 0) {
      // Немає змін
      this.saved.emit();
      this.close();
      return;
    }

    let completed = 0;

    toAdd.forEach(qualId => {
      const qualification = this.availableQualifications.find(q => q.id === qualId);

      this.http.post(
          `http://localhost:8089/employees/${employeeId}/qualifications`,
          {
            id: qualId,
            skill: qualification?.skill
          },
          {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
          }
      ).subscribe({
        next: () => {
          completed++;
          if (completed === totalOperations) {
            this.saved.emit();
            this.close();
          }
        },
        error: err => console.error('Failed to add qualification', err)
      });
    });

    toRemove.forEach(qualId => {
      this.http.delete(
          `http://localhost:8089/employees/${employeeId}/qualifications`,
          {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`),
            body: { id: qualId }
          }
      ).subscribe({
        next: () => {
          completed++;
          if (completed === totalOperations) {
            this.saved.emit();
            this.close();
          }
        },
        error: err => console.error('Failed to remove qualification', err)
      });
    });
  }

}
