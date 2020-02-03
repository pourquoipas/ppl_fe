export interface Entity {
    uuid: string;
}

/** TODO lastMod + lastUser */
export interface TenantEntity extends Entity {
	societa: string;
	lastMod: Date;
	lastUser: string;
}

export interface Table extends TenantEntity {
	codice: string;
	descrizione: string;
	inizio: Date;
	fine: Date;
}