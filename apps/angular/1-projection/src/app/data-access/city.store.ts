import { Injectable } from '@angular/core';
import { City } from '../model/';
import { randomCity as randCity } from './fake-http.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends Store {
  public create(): City {
    return randCity();
  }
}
