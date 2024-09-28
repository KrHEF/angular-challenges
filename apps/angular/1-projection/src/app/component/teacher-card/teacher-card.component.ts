import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FakeHttpService } from '../../data-access/fake-http.service';
import { Store } from '../../data-access/store';
import { TeacherStore } from '../../data-access/teacher.store';
import { StoreItem, Teacher } from '../../model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  templateUrl: 'teacher-card.compoment.html',
  styleUrl: 'teacher-card.compoment.scss',
  standalone: true,
  providers: [
    {
      provide: Store,
      useExisting: TeacherStore,
    },
  ],
  imports: [AsyncPipe, CardComponent],
})
export class TeacherCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(TeacherStore);

  public get teachers$(): Observable<StoreItem[]> {
    return this.store.items$;
  }

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((teachers: Teacher[]) => {
      this.store.set(teachers.map(TeacherStore.convertTeacherToStoreItem));
    });
  }
}
