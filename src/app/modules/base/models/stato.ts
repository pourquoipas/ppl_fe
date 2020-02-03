import { Table } from 'src/app/shared/models/entity';

export class Stato implements Table {	
	uuid: string;
	
	lastUser: string;
	lastMod: Date;
	
	societa: string;
	
	codice: string;
	descrizione: string;
	inizio: Date;
	fine: Date;
	
	isoAlpha2: string;
	isoAlpha3: string;
	isoNumeric: string;
	
}