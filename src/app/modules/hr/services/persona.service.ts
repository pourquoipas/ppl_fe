import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { AllServService } from 'src/app/core/services/all-serv.service';
import { Observable, of } from 'rxjs';
import { AbstractTenantService } from 'src/app/core/abstract/services/abstract-tenant.service';
import { Indirizzo } from '../models/indirizzo';
import { Comune } from '../../base/models/comune';
import { Provincia } from '../../base/models/provincia';
import { Stato } from '../../base/models/stato';
import { TitoloStudio } from '../../base/models/titolostudio';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends AbstractTenantService<Persona> {

  constructor(
        protected allServ: AllServService,
	) {
		super('personaBe', allServ);
	 }

	public newInstance(): Observable<Persona> {
		let p: Persona = new Persona();
		p.residenza = new Indirizzo();
		p.domicilio = new Indirizzo();
		return of(p);
	}
	
	public retPickCittadinanza(entity: Persona, retPickObj: Stato) {
		entity.cittadinanza = retPickObj;
		if (entity.cittadinanza && entity.cittadinanza != null) {
			entity.cittadinanzaId = entity.cittadinanza.uuid;
		} else {
			entity.cittadinanzaId = null;
		}
	}
	public retPickStatoNascita(entity: Persona, retPickObj: Stato) {
		entity.statoNascita = retPickObj;
		if (entity.statoNascita && entity.statoNascita != null) {
			entity.statoNascitaId = entity.statoNascita.uuid;
		} else {
			entity.statoNascitaId = null;
		}
	}
	public retPickProvinciaNascita(entity: Persona, retPickObj: Provincia) {
		entity.provinciaNascita = retPickObj;
		if (entity.provinciaNascita && entity.provinciaNascita != null) {
			entity.provinciaNascitaId = entity.provinciaNascita.uuid;
		} else {
			entity.provinciaNascitaId = null;
		}
		if (retPickObj && retPickObj.stato != null) {
			PersonaService.prototype.retPickStatoNascita(entity, retPickObj.stato);
		}
	}
	public retPickComuneNascita(entity: Persona, retPickObj: Comune) {
		entity.comuneNascita = retPickObj;
		if (entity.comuneNascita && entity.comuneNascita != null) {
			entity.comuneNascitaId = entity.comuneNascita.uuid;
		} else {
			entity.comuneNascitaId = null;
		}
		if (retPickObj && retPickObj.provincia != null) {
			PersonaService.prototype.retPickProvinciaNascita(entity, retPickObj.provincia);
		}
		if (retPickObj && retPickObj.stato != null) {
			PersonaService.prototype.retPickStatoNascita(entity, retPickObj.stato);
		}
	}
	public retPickTitoloStudio(entity: Persona, retPickObj: TitoloStudio) {
		entity.titoloStudio = retPickObj;
		if (entity.titoloStudio && entity.titoloStudio != null) {
			entity.titoloStudioId = entity.titoloStudio.uuid;
		} else {
			entity.titoloStudioId = null;
		}
	}
	public retPickIndirizzoComune(entity: Indirizzo, retPickObj: Comune) {
		entity.comune = retPickObj;
		if (entity.comune && entity.comune != null) {
			entity.comuneId = entity.comune.uuid;
		} else {
			entity.comuneId = null;
		}
		if (retPickObj && retPickObj.provincia != null) {
			PersonaService.prototype.retPickIndirizzoProvincia(entity, retPickObj.provincia);
		}
		if (retPickObj && retPickObj.stato != null) {
			PersonaService.prototype.retPickIndirizzoStato(entity, retPickObj.stato);
		}
	}
	public retPickIndirizzoProvincia(entity: Indirizzo, retPickObj: Provincia) {
		entity.provincia = retPickObj;
		if (entity.provincia && entity.provincia != null) {
			entity.provinciaId = entity.provincia.uuid;
		} else {
			entity.provinciaId = null;
		}
		if (retPickObj && retPickObj.stato != null) {
			PersonaService.prototype.retPickIndirizzoStato(entity, retPickObj.stato);
		}
	}
	public retPickIndirizzoStato(entity: Indirizzo, retPickObj: Stato) {
		entity.stato = retPickObj;
		if (entity.stato && entity.stato != null) {
			entity.statoId = entity.stato.uuid;
		} else {
			entity.statoId = null;
		}
	}
	
}
