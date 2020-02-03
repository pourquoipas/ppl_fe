import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AbstractService } from './abstract.service';
import { Entity } from 'src/app/shared/models/entity';
import { CollectionViewer } from '@angular/cdk/collections';
import { Search } from 'src/app/shared/models/search';
import { catchError, finalize } from 'rxjs/operators';

/**
 * Ispirato da: https://blog.angular-university.io/angular-material-data-table/ 
 */
export class RemoteDataSource<T extends Entity>  implements DataSource<T> {

    private dataSubject = new BehaviorSubject<T[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private dataService: AbstractService<T>) {}

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    loadData(search: Search<T>) {

        this.loadingSubject.next(true);

        this.dataService.find(search)
		.pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(
			data => { 
				this.dataSubject.next(data);
			}
		);
    }  
	
}