import { TenantEntity } from 'src/app/shared/models/entity';
import { SessoEnum } from './enums/sessoenum';
import { StatoCivileEnum } from './enums/statocivileenum';
import { Stato } from '../../base/models/stato';
import { Provincia } from '../../base/models/provincia';
import { Comune } from '../../base/models/comune';
import { TitoloStudio } from '../../base/models/titolostudio';
import { Indirizzo } from './indirizzo';
import { Contatto } from './contatto';

export class Persona implements TenantEntity {
	uuid: string;
	lastUser: string;
	lastMod: Date;
	societa: string;
	
	codice: string;
	cognome: string;
	nome: string;
	sesso: SessoEnum;
	statoCivile: StatoCivileEnum;
	dataNascita: Date;
	statoNascitaId: string;
	statoNascita: Stato;
	provinciaNascitaId: string;
	provinciaNascita: Provincia;
	comuneNascitaId: string;
	comuneNascita: Comune;
	cittadinanzaId: string;
	cittadinanza: Stato;
	codiceFiscale: string;
	titoloStudioId: string;
	titoloStudio: TitoloStudio;
	titoloStudioDesc: string;
	titoloStudioAnno: number;
    residenza: Indirizzo;  	
    domicilio: Indirizzo;  

	contatti: Contatto [];
	
}