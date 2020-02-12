import { Entity } from './entity';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class RowDataSource<T extends Entity> extends DataSource<T> {

  private dataSubject = new BehaviorSubject<T[]>([]);

  data() {
    return this.dataSubject.value;
  }

  update(data) {
    this.dataSubject.next(data);
  }

  constructor(data: T[]) {
    super();
    this.dataSubject.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(_collectionViewer: CollectionViewer): Observable<T[] | readonly T[]> {
    return this.dataSubject;
  }

  disconnect(collectionViewer: CollectionViewer) {}
}