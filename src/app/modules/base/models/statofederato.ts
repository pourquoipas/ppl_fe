import { Table } from 'src/app/shared/models/entity';
import { Stato } from './stato';

export class StatoFederato implements Table {	
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
}