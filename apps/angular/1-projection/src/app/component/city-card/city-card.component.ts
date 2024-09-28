import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { Store } from '../../data-access/store';
import { StoreItem } from '../../model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="(cities$ | async) ?? []" iconPath="assets/img/city.png" />
  `,
  standalone: true,
  providers: [
    {
      provide: Store,
      useExisting: CityStore,
    },
  ],
  imports: [AsyncPipe, CardComponent],
})
export class CityCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly cityStore = inject(CityStore);

  public get cities$(): Observable<StoreItem[]> {
    return this.cityStore.items$;
  }

  public ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.cityStore.set(cities));
  }
}
