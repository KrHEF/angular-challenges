import { Injectable } from '@angular/core';
import { StoreItem, Teacher } from '../model/';
import { randTeacher } from './fake-http.service';
import { Store } from './store';

interface TeacherStoreItem extends Teacher, StoreItem {}

@Injectable({
  providedIn: 'root',
})
export class TeacherStore extends Store {
  public static convertTeacherToStoreItem(item: Teacher): TeacherStoreItem {
    return {
      ...item,
      name: `${item.firstName} ${item.lastName}`,
    };
  }

  public create(): TeacherStoreItem {
    return TeacherStore.convertTeacherToStoreItem(randTeacher());
  }
}
