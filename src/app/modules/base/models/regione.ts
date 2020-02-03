import { Table } from 'src/app/shared/models/entity';
import { Stato } from './stato';
import { StatoFederato } from './statofederato';

export class Regione implements Table {	
	uuid: string;
	
	lastUser: string;
	lastMod: Date;
	
	societa: string;
	
	codice: string;
	descrizione: string;
	inizio: Date;
	fine: Date;
	
	statoId: string;
	stato: Stato;
	
	statofederatoId: string;
	statofederato: StatoFederato;
}