import { Entity } from 'src/app/shared/models/entity';
import { HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Search } from 'src/app/shared/models/search';
import { AllServService } from '../../services/all-serv.service';

/**
 * <h3>Classe collegata ad una tabella o ad un servizio CRUD di BackEnd.</h3>
 * <ul>La classe dovrà essere in grado di:
 * <li>(1) chiamare i verb più semplici sul backend: (1.1) find(search), (1.2) retrieve(uuid), (1.3) delete(uuid), (1.4) save(entity), (1.5) update(entity)</li>
 * <li>(2) creare una nuova entity</li>
 * </ul>
 */
export abstract class AbstractService<T extends Entity> {

	public beUrl: string;
	public listSize: number;

	constructor(
		//		protected 
		protected bePath: string,
		protected allServ: AllServService
	) {
		this.beUrl = this.allServ.configService.get(bePath);
	}
	// =================================== TODO AREA Cose da fare o migliorare ===========
	public handleError(error: HttpErrorResponse): Observable<any> {
		console.error(error);
		return throwError(error || 'Generic service error');
	}

	// =================================== (1.1) =======================================
	/** (1.1) Ricerca */
	public find(search: Search<T>): Observable<T[]> {
		if (this.preFind(search)) {
			const params = new HttpParams();
			this.allServ.apiUtilService.fillPageInformation(params, search.page);

			return this.allServ.httpClient.post<T[]>(this.beUrl + '/search', search, {
				observe: 'response', params
			})
				.pipe(
					map(res => {
						search.page.totalResults = res.headers.get('totalResults') != null ? +res.headers.get('totalResults') : 0;
						return res.body;
					}),
					catchError(this.handleError)
				);

		}
	}
	/** (1.1) Se servono controlli prima di un find, farne l'override. In caso di errori ritornare false. */
	public preFind(search: Search<T>): boolean {
		return true;
	}

	/** Usare con cautela, ritorna tutti i record in modo non paginato */
	public all(): Observable<T[]> {
		return this.allServ.httpClient.get<T[]>(this.beUrl)
			.pipe(catchError(this.handleError));
	}

	// ================================= (1.2) ==========================================
	/** recupera un entity a partire dal suo uuid */
	public retrieve(uuid: string): Observable<T> {
		return this.allServ.httpClient.get<T>(this.beUrl + '/' + uuid)
			.pipe(catchError(this.handleError));
	}

	/** Farne l'override se trattate un elemento che gestisce l'uuid in modo differente. */
	public getElementUUId(element: T) {
		return element.uuid;
	}

	// ================================= (1.3) ==========================================
	/** elimina una entity (delete, entity esistente) */
	public delete(entity: T): Observable<T> {
		const params = new HttpParams();
		return this.allServ.httpClient.delete<T>(this.beUrl + '/' + entity.uuid, {
			observe: 'response', params
		})
			.pipe(
				map(res => {
					return res.body;
				}),
				catchError(this.handleError)
			);
	}

	// ================================= (1.4) ==========================================
	/** salva una entity (insert, nuova entity) */
	public insert(entity: T): Observable<T> {
		if (this.preInsert(entity)) {
			const params = new HttpParams();
			return this.allServ.httpClient.post<T>(this.beUrl, entity, {
				observe: 'response', params
			})
				.pipe(
					map(res => {
						return res.body;
					}),
					catchError(this.handleError)
				);
		}
	}
	public preInsert(entity: T): boolean {
		return true;
	}
	// ================================= (1.5) ==========================================
	/** aggiorna una entity (update, entity esistente) */
	public update(entity: T): Observable<T> {
		if (this.preUpdate(entity)) {
			const headerDict = {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				//		  'Access-Control-Allow-Headers': 'Content-Type',
			}
			const params = new HttpParams();
			return this.allServ.httpClient.put<T>(this.beUrl, entity, {
				observe: 'response', params, headers: new HttpHeaders(headerDict)
			})
				.pipe(
					map(res => {
						return res.body;
					}),
					catchError(this.handleError)
				);
		}
	}
	public preUpdate(entity: T): boolean {
		return true;
	}


	// ================================= (2) ============================================
	/** crea una nuova istanza dell'entity gestita' */
	public abstract newInstance(): Observable<T>;
}

