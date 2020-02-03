import { LivelloTitoloStudioEnum } from './enums/livellotitolostudioenum';
import { Table } from 'src/app/shared/models/entity';

export class TitoloStudio implements Table {	
	uuid: string;
	
	lastUser: string;
	lastMod: Date;
	
	societa: string;
	
	codice: string;
	descrizione: string;
	inizio: Date;
	fine: Date;
	
	livello: LivelloTitoloStudioEnum;
}