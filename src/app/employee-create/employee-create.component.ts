import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Employee';
import {TokenService} from "../TokenService";
import {QualificationService} from "../QualfikationService";
import {Qualification} from "../Qualification";


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
    city: '',
    skillSet: []
  };
  availableQualifications: Qualification[] = [];
  selectedQualificationIds: number[] = [];



  open() {
    this.employee = {
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      postcode: '',
      city: '',
      skillSet: []
    };
    this.show = true;
    this.selectedQualificationIds = [];
  }
  close() {
    this.show = false;
    this.employee = {
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      postcode: '',
      city: '',
      skillSet: []
    };
    this.selectedQualificationIds = [];
  }
  constructor(private http: HttpClient, private tokenService: TokenService, private qualificationService: QualificationService) {}

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
    const token =this.tokenService.getToken();

    this.http.post<Employee>(
      'http://localhost:8089/employees',
      this.employee,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
      }
    ).subscribe({
      next: (createdEmployee) => {
        this.addQualificationsToEmployee(createdEmployee.id!, token)
        this.saved.emit();
        this.close();
      },
      error: err => console.error('Create failed', err)
    });
  }

  private addQualificationsToEmployee(employeeId: number, token: string) {
    const requests = this.selectedQualificationIds.map(qualId => {
      const qualification = this.availableQualifications.find(q => q.id === qualId);
      return this.http.post(
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
      )
    });
    if (requests.length > 0) {
      let completed = 0;
      requests.forEach(req => {
        req.subscribe({
          next: () => {
            completed++;
            if (completed === requests.length) {
              this.saved.emit();
              this.close();
            }
          },
          error: err => console.error('Failed to add qualification', err)
        });
      });
    } else {
      this.saved.emit();
      this.close();
    }
  }
}

