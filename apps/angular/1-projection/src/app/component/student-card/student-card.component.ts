import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FakeHttpService } from '../../data-access/fake-http.service';
import { Store } from '../../data-access/store';
import { StudentStore } from '../../data-access/student.store';
import { StoreItem } from '../../model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="(students$ | async) ?? []"
      iconPath="assets/img/student.webp"
      customClass="bg-light-green"></app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  providers: [
    {
      provide: Store,
      useExisting: StudentStore,
    },
  ],
  imports: [AsyncPipe, CardComponent],
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

  public get students$(): Observable<StoreItem[]> {
    return this.store.items$;
  }

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((students) => {
      this.store.set(students.map(StudentStore.convertStudentToStoreItem));
    });
  }
}
