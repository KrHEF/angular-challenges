import { Injectable } from '@angular/core';

import { StoreItem, Student } from '../model/';
import { randStudent } from './fake-http.service';
import { Store } from './store';

interface StudentStoreItem extends Student, StoreItem {}

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends Store {
  public static convertStudentToStoreItem(item: Student): StudentStoreItem {
    return {
      ...item,
      name: `${item.firstName} ${item.lastName}`,
    };
  }

  public create(): StudentStoreItem {
    return StudentStore.convertStudentToStoreItem(randStudent());
  }
}
