import { Entity } from 'src/app/shared/models/entity';

export interface Tenant extends Entity {
	codice: string;
	descrizione: string;
	
	ruoloAccesso: string;
}