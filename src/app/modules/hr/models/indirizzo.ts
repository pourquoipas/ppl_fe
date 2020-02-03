import { Stato } from '../../base/models/stato';
import { Provincia } from '../../base/models/provincia';
import { Comune } from '../../base/models/comune';
import { Entity } from 'src/app/shared/models/entity';

export class Indirizzo implements Entity{
	uuid: string;
	
	lastUser: string;
	lastMod: Date;
	
	statoId: string;
	stato: Stato;
	provinciaId: string;
	provincia: Provincia;
	comuneId: string;
	comune: Comune;
	cap: string;
	localita: string;
	indirizzo: string;
	civico: string;
	interno: string;
	scala: string;
	edificioDesc: string;
	aggiuntive: string;
	
}