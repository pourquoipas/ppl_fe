import { ManageErrorCallback } from './abstract-component';
import { Entity } from 'src/app/shared/models/entity';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Search, FIRST_PAGE } from 'src/app/shared/models/search';
import { AbstractService } from '../services/abstract.service';
import { InitState } from '../../util/init-state';
import { MatPaginator } from '@angular/material';
import { RemoteDataSource } from '../services/remote-data-source';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { GENERIC_ROUTES } from '../../configuration/constants';
import { SingleFilter, FilterKind } from 'src/app/shared/models/filter';
import { AbstractInitComponent } from './abstract-init-component';
import { AllService } from '../../services/all.service';

export class ConfigList {
	constructor(
		public title: string,
		public path: string,
		public canNew: boolean,
		public canEdit: boolean,
		public canView: boolean,
	) {}
}

/** Deve gestire un elenco di dati (Entity)<br>
 * <ul>Fondamentalemnte:
 * <li>(1) Conterrà i parametri di ricerca</li>
 * <li>(2) potrà eseguire una ricerca (grazie al servizio)</li>
 * <li>(3) potrà azzerare i parametri</li>
 * <li>(4) potrà far passare l'utente alla visualizzazione/modifica</li>
 * <li>(5) potrebbe contenere stampe o esportazioni</li>
 * <li>(6) verificherà che l'utente abbia accesso al dato</li>
 * <li>(*) varie ed eventuali da aggiungere</li>
 * </ul>
 * <br>
 * <p> Inizializzazione:<br>
 * Eseguire l'override di initSync() per tutte le funzionalità di inizializzazione sincrona, al termine impostare this.init.doneSync = true;<br>
 * Eseguire l'override di initAsync() per tutte le funzionalità di inizializzazione sincrona, al termine impostare this.init.doneAsync = true;<br>
 * Nel template utilizzate initialized per renderizzare gli oggetti che attendono l'inizializzazione.<br>
 * </p>
 */
export abstract class AbstractListComponent<T extends Entity> extends AbstractInitComponent implements AfterViewInit {

//	/** Variabile per sapere se il controller è inizializzato.  */
//	// protected init: ActivityDone;
//	protected init: MyStateManager<InitState, boolean>;
//	protected initState: InitState;
	/** variabile principale per la ricerca */
	protected search: Search<T> = null;
	protected dataSource: RemoteDataSource<T>;
	
	public filters: SingleFilter [] = [];	

	public page: T[];

	constructor(
		protected config: ConfigList,
/*		
		protected configService: ConfigService,
		protected translateService: TranslateService,
		protected msgService: MsgService,
		protected menuService: MenuService,
*/		
		protected all: AllService,
        protected router: Router,
        protected route: ActivatedRoute,
		protected service: AbstractService<T>) {
		super(all.translateService, all.msgService);
		all.menuService.function = config.title;
	}
	
	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;	

	// ======================= Initialization ============
//	ngOnInit(): void {
//		this.initState = new InitState(false, false)
//		this.init = new MyStateManager<InitState, boolean>(this.initState, INIT_STATE_BEHAVIOUR);
//		this.init.state$
//			.subscribe(newState => {
//				this.initState = newState;
//				if (newState.initialized()) {
//					this.dataSource = new RemoteDataSource(this.service);
//					this.dataSource.loadData(this.search);
//					if (this.paginator) {
//						this.paginator.pageIndex = this.search.page.page;
//					}
//					// this.find();
//				}
//			});
//		this.initSync();
//		this.initAsync();
//		// throw new Error('Method not implemented.');
//	}
	protected initSync() {
		this.initSearch();
		this.initFilters();
		super.initSync();
//		this.init.handleEvent(new InitStateSync(true));
	}
//	protected initAsync() {
//		this.init.handleEvent(new InitStateAsync(true));
//	}
//	public initialized(): boolean {
//		// return this.init && this.init.state.initialized();
//		return this.initState && this.initState.initialized();
//	}

	public initStateChanged(newState: InitState) {
		if (newState.initialized()) {
			this.dataSource = new RemoteDataSource(this.service);
			this.search.page.pageSize = this.all.configService.get("listPageSize");
			this.dataSource.loadData(this.search);
			if (this.paginator) {
				this.paginator.pageIndex = this.search.page.page;
				this.paginator.pageSize = this.search.page.pageSize;
			}
			// this.find();
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
	/** ritorna true se la configurazione passata consente l'edit di una entità */
	public canEdit(): boolean {
		return this.config.canEdit;
	}
	/** ritorna true se la configurazione passata consente il view di una entità */
	public canView(): boolean {
		return this.config.canView;
	}
	/** va in edit dell'entità passata. */
	public edit(element: T) {
        if (this.config && this.config.path) {
            this.router.navigate(['/' + this.config.path + '/' + GENERIC_ROUTES.EDIT, this.service.getElementUUId(element)]);
        } else {
            this.router.navigate([GENERIC_ROUTES.CONFIG_CONTROLLER_ERROR]);
        }
	}
	/** va in visualizzazione dell'entità passata. */
	public view(element: T) {
        if (this.config && this.config.path) {
            this.router.navigate(['/' + this.config.path + '/' + GENERIC_ROUTES.VIEW, this.service.getElementUUId(element)]);
        } else {
            this.router.navigate([GENERIC_ROUTES.CONFIG_CONTROLLER_ERROR]);
        }
	}
	
	public new() {
        if (this.config && this.config.path) {
            this.router.navigate(['/' + this.config.path + '/' + GENERIC_ROUTES.EDIT]);
        } else {
            this.router.navigate([GENERIC_ROUTES.CONFIG_CONTROLLER_ERROR]);
        }
	}

	protected handleError(error: any, callback: ManageErrorCallback = null) {
		console.log(JSON.stringify(error));
		super.handleError(error, callback);
	}


//	public handlePage(event: any) {
//		this.search.page.page = event.pageIndex;
//		this.search.page.pageSize = event.pageSize;
//		this.find();
//	}
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
