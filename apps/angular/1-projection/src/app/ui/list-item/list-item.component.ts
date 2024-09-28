import { Component, Input, inject } from '@angular/core';
import { Store } from '../../data-access/store';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <button (click)="delete(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;

  private readonly store = inject(Store);

  delete(id: number) {
    this.store.delete(id);
  }
}
