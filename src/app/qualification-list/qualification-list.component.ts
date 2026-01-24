import { Component } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Qualification} from "../Qualification";
import {CommonModule} from "@angular/common";
import {QualificationService} from "../QualfikationService";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;
  filterText: string = '';
  allQualifications$: Observable<Qualification[]>;


  isAdding: boolean = false;
  newQualificationSkill: string = '';

  showEditModal: boolean = false;
  editingQualification: Qualification | null = null;
  editingSkill: string = '';

  constructor(private qualificationService: QualificationService) {
    this.allQualifications$ = this.qualificationService.getQualifications();
    this.qualifications$ = this.allQualifications$;
  }

  trackByQualificationId(index: number, item: any): number {
    return item.id;
  }

  startAdding() {
    this.isAdding = true;
    this.newQualificationSkill = '';
  }

  cancelAdding() {
    this.isAdding = false;
    this.newQualificationSkill = '';
  }

  saveNewQualification() {
    if (this.newQualificationSkill.trim() === '') {
      alert('Bitte geben Sie eine Bezeichnung ein!');
      return;
    }

    const newQualification: Qualification = {
      skill: this.newQualificationSkill.trim()
    };

    this.qualificationService.createQualification(newQualification)
      .subscribe({
        next: (created) => {
          console.log('Qualifikation erstellt:', created);
          this.isAdding = false;
          this.newQualificationSkill = '';
          this.reload();
        },
        error: (error) => {
          console.error('Fehler beim Erstellen:', error);
          alert('Fehler beim Speichern!');
        }
      });
  }

  openEditModal(qualification: Qualification) {
    this.editingQualification = qualification;
    this.editingSkill = qualification.skill || '';
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingQualification = null;
    this.editingSkill = '';
  }

  saveEdit() {
    if (!this.editingQualification || this.editingSkill.trim() === '') {
      alert('Bitte geben Sie eine Bezeichnung ein!');
      return;
    }

    const updatedQualification: Qualification = {
      id: this.editingQualification.id,
      skill: this.editingSkill.trim()
    };

    this.qualificationService.updateQualification(
      this.editingQualification.id!,
      updatedQualification
    ).subscribe({
      next: (updated) => {
        console.log('Qualifikation aktualisiert:', updated);
        this.closeEditModal();
        this.reload();
      },
      error: (error) => {
        console.error('Fehler beim Aktualisieren:', error);
        alert('Fehler beim Speichern!');
      }
    });
  }


  applyFilter() {
    if (this.filterText.trim() === '') {
      this.qualifications$ = this.allQualifications$;
    } else {
      this.qualifications$ = this.allQualifications$.pipe(
        map(qualifications =>
          qualifications.filter(q =>
            q.skill?.toLowerCase().includes(this.filterText.toLowerCase())
          )
        )
      );
    }
  }

  delete(id: number) {
    if (confirm('Möchten Sie diese Qualifikation wirklich löschen?')) {
      this.qualificationService.deleteQualification(id)
        .subscribe({
          next: () => {
            console.log('Qualifikation gelöscht');
            this.reload();
          },
          error: (error) => {
            console.error('Fehler beim Löschen:', error);
          }
        });
    }
  }


  private reload() {
    this.allQualifications$ = this.qualificationService.getQualifications();
    this.applyFilter();
  }
}
