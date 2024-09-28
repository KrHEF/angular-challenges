import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { Store } from '../../data-access/store';
import { StoreItem } from '../../model/store-item';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrl: 'card.component.scss',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: StoreItem[] = [];
  @Input() customClass = '';
  @Input() iconPath?: string;

  private readonly store = inject(Store);

  public addNewItem() {
    const item = this.store.create();
    this.store.add(item);
  }
}
