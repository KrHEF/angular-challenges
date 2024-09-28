import { BehaviorSubject, Observable } from 'rxjs';
import { StoreItem } from '../model/store-item';

export abstract class Store {
  protected readonly _items$ = new BehaviorSubject<StoreItem[]>([]);

  public get items$(): Observable<StoreItem[]> {
    return this._items$.asObservable();
  }

  public get items(): ReadonlyArray<StoreItem> {
    return this._items$.value;
  }

  public add(item: StoreItem): void {
    this._items$.next([...this.items, item]);
  }

  public set(items: StoreItem[]): void {
    this._items$.next(items);
  }

  public delete(id: number): void {
    this._items$.next(
      this.items.filter((item: StoreItem): boolean => item.id !== id),
    );
  }

  public abstract create(): StoreItem;
}
