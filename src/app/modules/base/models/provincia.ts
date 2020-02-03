import { Table } from 'src/app/shared/models/entity';
import { Stato } from './stato';
import { StatoFederato } from './statofederato';
import { Regione } from './regione';

export class Provincia implements Table {	
	uuid: string;
	
	lastUser: string;
	lastMod: Date;
	
	societa: string;
	
	codice: string;
	descrizione: string;
	inizio: Date;
	fine: Date;
	
	sigla: string;
	
	statoId: string;
	stato: Stato;
	
	statofederatoId: string;
	statofederato: StatoFederato;
	
	regioneId: string;
	regione: Regione;
}