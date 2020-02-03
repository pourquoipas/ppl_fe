import { Entity } from 'src/app/shared/models/entity';
import { AbstractInitComponent } from './abstract-init-component';
import { AfterViewInit, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { Search, FIRST_PAGE } from 'src/app/shared/models/search';
import { RemoteDataSource } from '../services/remote-data-source';
import { SingleFilter, FilterKind } from 'src/app/shared/models/filter';
import { AllService } from '../../services/all.service';
import { Router } from '@angular/router';
import { AbstractService } from '../services/abstract.service';
import { MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InitState } from '../../util/init-state';
import { tap } from 'rxjs/operators';
import { ManageErrorCallback } from './abstract-component';
import { PickData } from 'src/app/shared/models/pick-data';

export abstract class AbstractPickComponent<T extends Entity> extends AbstractInitComponent implements AfterViewInit {

	/** variabile principale per la ricerca */
	protected search: Search<T> = null;
	protected dataSource: RemoteDataSource<T>;
	
	public filters: SingleFilter [] = [];	

	public page: T[];

    @Output() select: EventEmitter<T> = new EventEmitter<T>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

	constructor(
		protected title: string,
		protected all: AllService,
		public dialogRef: MatDialogRef<AbstractPickComponent<T>>,
//        protected router: Router,
		protected service: AbstractService<T>) {
		super(all.translateService, all.msgService);
	}
	
	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;	
	
	public pickTitle(): string {
		return this.title;
	}

	protected initSync() {
		this.initSearch();
		this.initFilters();
		super.initSync();
	}
	
	public initStateChanged(newState: InitState) {
		if (newState.initialized()) {
			this.dataSource = new RemoteDataSource(this.service);
			this.search.page.pageSize = this.all.configService.get("listPickSize");
			this.dataSource.loadData(this.search);
			if (this.paginator) {
				this.paginator.pageIndex = this.search.page.page;
				this.paginator.pageSize = this.search.page.pageSize;
			}
		}
	}
	
	public initConfig() {
	}
	
	ngAfterViewInit() {
		this.initConfig();
		this.paginator.page
			.pipe(
				tap(() => this.loadDataPage())
			)
			.subscribe();
	}


	/** (1) inizializzate this.search = new Search<classe>(classe); */
	public abstract initSearch();
	/** (1) inizializzate this.filters per costruire il sistema di filtro. */
	public abstract initFilters();
	/** gestione di un singolo filtro, in caso sia un filtro particolare */
	public /* abstract */ handleFilter(filter: SingleFilter, search: Search<T>): boolean {
		return false;
	}
	

	/** (3) reset della form di ricerca (N.B. va rilanciata la ricerca?) */
	public resetFilters() {
		this.initSearch();
	}
	
	public buildSearchForFind(search: Search<T>) {
		this.filters.forEach( filter => {
			if (!this.handleFilter(filter, search)) {
				switch (filter.kind) {
case FilterKind.eq:
					search.eq[filter.field] = filter.value; 
					break;
case FilterKind.like:
					search.like[filter.field] = filter.value; 
					break;
case FilterKind.ge:
					search.ge[filter.field] = filter.value; 
					break;
case FilterKind.le:
					search.le[filter.field] = filter.value; 
					break;
				}
			}
		});
	}
	

	// =============================== Ricerca ==============
	/** (2) ricerca */
	public find(callback: ManageErrorCallback = null) {
		if (this.canFind()) {
			this.service.find(this.search)
				.subscribe(
					(page: T[]) => {
						this.page = page;
					},
					error => {
						this.handleError(error, callback);
					}
				);
		}
	}
	public handleFilterChange(event: any) {
		// TODO vedere come gestire eventi diversi dal find.
		this.buildSearchForFind(this.search);
		this.search.page.page = FIRST_PAGE;
		this.paginator.pageIndex = this.search.page.page;
		// this.dataSource.loadData(this.search);
		this.loadDataPage();
		// this.find();
	}

	/** (2) se serve far tornare false nel caso in cui non sia possibile avviare una find */
	public canFind(): boolean {
		return true;
	}
	
	/** va in visualizzazione dell'entità passata. */
	public onSelect(element: T) {
		this.selected(element);
		this.dialogRef.close({data: element});
		this.select.emit(element);
	}
	public abstract selected(entity: T);
	public onCancel() {
		this.dialogRef.close();
		this.cancel.emit();
	}
	
	protected handleError(error: any, callback: ManageErrorCallback = null) {
		console.log(JSON.stringify(error));
		super.handleError(error, callback);
	}

    public loadDataPage() {
		if (this.dataSource != null) {
			this.search.page.page = this.paginator.pageIndex;
			this.search.page.pageSize = this.paginator.pageSize;
			this.dataSource.loadData(this.search);
		}
	}
	public pageSize(): number {
		return this.search.page.pageSize;
	}
	public totalPages(): number {
		return this.search.page.totalResults;
	}
	public currentPage(): number {
		return this.search.page.page;
	}
}