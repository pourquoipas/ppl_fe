import { Table } from 'src/app/shared/models/entity';
import { Stato } from './stato';
import { StatoFederato } from './statofederato';
import { Regione } from './regione';
import { Provincia } from './provincia';

export class Comune implements Table {	
	uuid: string;
	
	lastUser: string;
	lastMod: Date;
	
	societa: string;
	
	codice: string;
	descrizione: string;
	inizio: Date;
	fine: Date;
	
	codiceStatistico: string;
	cap: string;
	cap_comune: string [];
	
	statoId: string;
	stato: Stato;
	
	statofederatoId: string;
	statofederato: StatoFederato;
	
	regioneId: string;
	regione: Regione;
	
	provinciaId: string;
	provincia: Provincia;
}
