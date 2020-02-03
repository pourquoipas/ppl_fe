import { Tenant } from 'src/app/shared/models/tenant';

export class Societa implements Tenant {
	uuid: string;
	codice: string;
	descrizione: string;
	
	ruoloAccesso: string;
}